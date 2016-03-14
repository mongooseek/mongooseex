define([
    'Backbone',
    'jQuery',
    'collections/chat',
    'models/chat',
    'views/models/chat',
    'text!templates/collections/chat.html',
    'Moment'
], function (Backbone, $, ChatsCollection, ChatModel, ChatView, chatsTemplate, moment) {

    var ChatsView = Backbone.View.extend({
        el: "#for-templates",
        tmpl: _.template(chatsTemplate),
        initialize: function () {
            console.log("CHATS VIEW was INITIALIZED");
            this.render();
        },
        events: {
            'click #comment': 'comment',
        },
        addToFriends: function (e) {
            console.log('Clicked comment');
            e.preventDefault();
        },
        render: function () {
            console.log('Clicked CHAT BUTTON');
            var self = this;
            var $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.attr('id')) {
                $temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl);
            var chats = this.collection;
            chats.forEach(function (chatModel) {
                var view = new ChatView({model: chatModel});
            });
            return this;
        }
    });

    return ChatsView;
});