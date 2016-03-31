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
            var $messagesCounter = $('#counter');
            var secondPartId;
            var senderId;
            var unreadMessages;
            if (self.thisUser) {
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
        },
        messagesCounter: function () {
            var $messagesCounter = $('#counter');
            console.log($messagesCounter);
            $.ajax({
                type: "POST",
                url: '/unread',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"part2": APP.usrId}),
                success: function (unread) {
                    console.log(unread.n);
                    $messagesCounter.text(unread.n);
                }
            });
        },
        getFormsData: function () {
            var formsData;
            var $formsFields;
            var field;
            formsData = {};
            $formsFields = $('.form-control');
            $formsFields.each(function () {
                field = $(this).attr('id');
                if ($(this).val()) formsData[field] = $(this).val();
                $(this).val('');
            });
            return formsData;
        }
    });

    return AllView;
});