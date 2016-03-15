define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/chat',
    'text!templates/models/chat.html',
    'Moment',
], function (Backbone, _, $, ChatModel, chatTemplate, moment) {
    console.log("I am inside user view");
    var ChatView = Backbone.View.extend({
        el: '#comments-area',
        tmpl: _.template(chatTemplate),
        initialize: function () {
            console.log('Chat view initialized!');
            this.render();
        },
        events: {

        },
        render: function () {
            var self = this;
            var chatModel = this.model;
            if (chatModel.get('_id')) {
                self.$el.prepend(self.tmpl({content: chatModel.get('content')}));
            } else {
                chatModel.save(null, {
                    success: function (response) {
                        self.$el.prepend(self.tmpl({content: chatModel.get('content')}));
                    },
                    error: function (err) {
                        console.log('Failed to save chat');
                    }
                });
            }
        }
    });
    return ChatView;
});