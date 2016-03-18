//View to deal with 'chat' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/conversation',
    'text!templates/models/conversation.html',
    'Moment',
], function (Backbone, _, $, ConversationModel, conversationTemplate) {
    console.log("I am inside conversation view");
    var ConversationView = Backbone.View.extend({
        el: '#conversation-area',
        tmpl: _.template(chatTemplate),
        initialize: function () {
            console.log('Chat view initialized!');
            this.render();
        },
        events: {},
        render: function () {
            var self = this;
            var chatModel = this.model;
            if (chatModel.get('_id')) {
                self.$el.prepend(self.tmpl(chatModel.toJSON()));
            } else {
                chatModel.save(null, {
                    success: function (response) {
                        console.log('Successfully GOT resp with _id: ' + response.toJSON()._id);
                        self.emmitMessage(chatModel);
                    },
                    error: function (err) {
                        console.log('Failed to save chat');
                    }
                });
            }
        },
        emmitMessage: function (message) {
            var self = this;
            var mess = message;
            APP.io.emit('custom_event', mess, function (data) {
                self.appendToChat(mess);
            });
        },
        appendToChat: function (message) {
            var mess = message;
            var self = this;
            self.$el.prepend(self.tmpl(mess.toJSON()));
        }
    });
    return ChatView;
})
;