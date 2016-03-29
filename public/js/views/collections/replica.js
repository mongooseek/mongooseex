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
        el: "#vrakashy",
        tmpl: _.template(template),

        //<--" initialize: "--> removed to BaseCollectionsView.
        events: {
            'click .send-message': 'sendMessage',
            'click #message-button': 'message'
        },
        message: function () {
            var self = this;
            var $messageField;
            var message;
            var secondPartId;
            var firstPartId;
            var replicaModel;
            var replicaData;
            $messageField = $('message-field');
            message = $messageField.val();
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
                text: 'Hello world'
            };
            replicaModel.set(replicaData);
            replicaModel.content = 'api/replicas';
            replicaModel.save();
        },
        sendMessage: function (e) {
            var $messageField;
            var $messageArea;
            e.preventDefault();
            var id = e.target.type;
            var type = '[type="' + id + '"]';
            var $messageArea = $('textarea' + type);
            var $messageField = $('.message-field' + type);
            var message = $messageField.val();
            $messageField.val('');
            var replicaModel1 = new ReplicaModel();
            var replicaModel2 = new ReplicaModel();
            var date = moment();
            replicaModel1.set({part1: APP.usrId, part2: id, status: "sender", text: message, date: date});
            replicaModel2.set({part1: id, part2: APP.usrId, status: "receiver", text: message, date: date});
            replicaModel1.urlRoot = '/api/replicas/' + id + '/';
            replicaModel2.urlRoot = '/api/replicas/' + APP.usrId + '/';
            replicaModel1.save({patch: true});
            replicaModel2.save({patch: true});
            APP.io.emit('custom_event', {_id: id, sender: APP.usrId, text: message}, function (cd) {
                $messageArea.append(message);
                console.log(cd);
            });
        },
        appendToChat: function (message) {
            var $textArea;
            console.log('RECEIVED', message);
            var type = '[type="' + message.sender + '"]';
            $textArea = $('textarea' + type);
            $textArea.append('\n\n' + message.text);
            console.log($textArea);
        },
        render: function () {
            var self = this;
            APP.io.on('custom_response', function (message) {
                self.appendToChat(message);
            });
            $.ajax({
                type: "POST",
                url: '/login',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                //data: JSON.stringify({"pass": "9", "email": "9@1.1"}),
                success: function (thisUser) {
                    self.thisUser = thisUser;
                    APP.usrId = thisUser._id;
                    var $temporaryTemplate = $('.temporary-template');
                    if ($temporaryTemplate.length) {
                        $temporaryTemplate.remove();
                    }
                    $('#message-item').append(self.tmpl);
                    var replicas = self.collection;
                    replicas.forEach(function (replica) {
                        var view = new ReplicaView({model: replica});
                    });
                }
            });
        },
    });
    return ReplicasView;
});