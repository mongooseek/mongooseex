//View to deal with 'replicas' collection.
define([
    'Backbone',
    'jQuery',
    'views/abstract/collections/preBase',
    'collections/replica',
    'models/replica',
    'views/models/replica',
    'text!templates/collections/replica.html',
    'Moment',
    'socketio'
], function (Backbone, $, AllCollectionsView, ReplicasCollection, ReplicaModel, ReplicaView, template, moment, socketio) {

    var ReplicasView = AllCollectionsView.extend({
        tmpl: _.template(template),

        //<--" initialize: "--> removed to BaseCollectionsView.
        events: {
            'click .send-message': 'sendMessage',
            'click #message-button': 'message'
        },
        message: function () {
            var self = this;
            var $messageField = $('#message-field');
            var message;
            var secondPartId;
            var firstPartId;
            var replicaModel;
            var replicaData;
            message = $messageField.val();
            $messageField.val('');
            secondPartId = this.collection.content.substring(13);
            firstPartId = APP.usrId;
            replicaModel = new ReplicaModel();
            replicaData = {
                parts: [firstPartId, secondPartId],
                date: Date.now(),
                sender: {
                    firstName: self.thisUser.firstName,
                    lastName: self.thisUser.lastName,
                    id: self.thisUser._id
                },
                text: message
            };
            replicaModel.set(replicaData);
            replicaModel.content = 'api/replicas';
            replicaModel.save(null, {
                success: function (responce) {
                    APP.io.emit('custom_event', {_id: secondPartId, replica: replicaModel}, function (cd) {
                        /*{_id: id, sender: APP.usrId, text: message}*/
                        self.appendToChat(replicaModel);
                    });
                },
                error: function (err) {

                }
            });
        },
        appendToChat: function (replica) {
            console.log(replica);
            var view = new ReplicaView({model: replica});
        },
        render: function () {
            console.log('In replicas render');
            var self = this;
            var $messagesCounter = $('#counter');
            var secondPartId = self.collection.content.substring(13);
            var senderId;
            var unreadMessages;
            APP.io.removeListener('custom_response');
            APP.io.on('custom_response', function (message) {
                senderId = message.sender.id;
                if (secondPartId === senderId) {
                    var replicaModel = new ReplicaModel(message);
                    self.appendToChat(replicaModel);
                } else {
                    unreadMessages = parseInt($messagesCounter.text(), 10);
                    $messagesCounter.text(++unreadMessages);
                }
            });
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
                }
            });
        },
        setMessagesRead: function () {
            var secondPartId = APP.usrId;
            var firstPartId = this.collection.content.substring(13);
            var $messagesCounter = $('#counter');
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
                    unreadMessages = parseInt($messagesCounter.text()) - quantityOfReadMessages;
                    $messagesCounter.text(unreadMessages);
                }
            });
        },
    });

    return ReplicasView;
});