//All views extends main view.
define([
    'Backbone',
    'models/replica'
], function (Backbone, ReplicaModel) {

    var AllView = Backbone.View.extend({
        el: "#vrakashy",
        initialize: function () {
            this.render();
        },
        messageSystem: function () {
            var self = this;
            console.log(self);
            var $messagesCounter = $('#counter');
            var secondPartId;
            var senderId;
            var unreadMessages;
            if (self.thisUser) {
                console.log('OKEY');
                secondPartId = self.collection.content.substring(13);
            }
            APP.io.removeListener('custom_response');
            APP.io.on('custom_response', function (message) {
                senderId = message.sender.id;
                if (secondPartId && secondPartId === senderId) {
                    var replicaModel = new ReplicaModel(message);
                    self.appendToChat(replicaModel);
                } else {
                    unreadMessages = parseInt($messagesCounter.text(), 10);
                    $messagesCounter.text(++unreadMessages);
                }
            });
        }
    });

    return AllView;
});