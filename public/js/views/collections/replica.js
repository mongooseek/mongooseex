//View to deal with 'replicas' collection.
define([
    'Backbone',
    'jQuery',
    'views/abstract/all',
    'collections/replica',
    'models/replica',
    'views/models/replica',
    'text!templates/collections/replica.html'
], function (Backbone, $, AllView, ReplicasCollection, ReplicaModel, ReplicaView, template) {

    var ReplicasView = AllView.extend({

        tmpl: _.template(template),

        events: {
            'click .send-message': 'sendMessage',
            'click #message-button': 'message'
        },

        //Method is used for message sending.
        message: function () {
            var self = this;
            var $messageField = $('#message-field');
            var message = $messageField.val();
            var secondPartId = this.collection.content.substring(13);
            var firstPartId = APP.usrId;
            var replicaModel = new ReplicaModel();
            var replicaData = {
                parts: [firstPartId, secondPartId],
                date: Date.now(),
                sender: {
                    firstName: self.thisUser.firstName,
                    lastName: self.thisUser.lastName,
                    id: self.thisUser._id
                },
                text: message
            };
            $messageField.val('');
            replicaModel.set(replicaData);
            replicaModel.content = 'api/replicas';
            replicaModel.save(null, {
                success: function (responce) {
                    APP.io.emit('custom_event', {_id: secondPartId, replica: replicaModel}, function (cd) {
                        self.appendToChat(replicaModel);
                    });
                },
                error: function (err) {

                }
            });
        },

        //Helper to append sent message to own conversation.
        appendToChat: function (replica) {
            var view = new ReplicaView({model: replica});
        },

        render: function () {
            console.log('In replicas render');
            var self = this;
            var secondPartId = self.collection.content.substring(13);
            $.ajax({
                type: "POST",
                url: '/login',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (thisUser) {
                    self.thisUser = thisUser;
                    APP.usrId = thisUser._id;
                    if ($('#message-item').length) {
                        $('#message-item').remove();
                    }
                    $('#messages-table').append(self.tmpl({id: secondPartId}));
                    var replicas = self.collection;
                    replicas.forEach(function (replica) {
                        var view = new ReplicaView({model: replica});
                    });
                    self.setMessagesRead();
                    self.messageSystem();
                }
            });
        },

        //Helps to set counter of unread messages when concrete conversation was chosen.
        setMessagesRead: function () {
            var secondPartId = APP.usrId;
            var firstPartId = this.collection.content.substring(13);
            var $messagesCounter = $('#counter');
            var messagesInCounter = parseInt($messagesCounter.text());
            var quantityOfReadMessages;
            var unreadMessages;
            $.ajax({
                type: "POST",
                url: '/read',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"part1": firstPartId, "part2": secondPartId}),
                success: function (alreadyRead) {
                    quantityOfReadMessages = alreadyRead.nModified;
                    unreadMessages = messagesInCounter - quantityOfReadMessages;
                    $messagesCounter.text(unreadMessages);
                }
            });
        },
    });

    return ReplicasView;
});