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
            APP.io = socketio.connect();
            this.render();
        },
        events: {
            'click #comment': 'comment',
        },
        comment: function () {
            var $commentField = $('#comment-field');
            var message = $commentField.val();
            if (message) {
                APP.io.emit('custom_event', message, function (data) {
                    console.log('data', data);
                    console.log('message', message);
                });
            }
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
        },
        comment: function () {
            console.log('Clicked comment');
            var content = $('#comment-field').val();
            if (content) {
                console.log('content is', content);
                var chatModel = new ChatModel();
                chatModel.set({content: content, owner: APP.usrId});
                var chatView = new ChatView({model: chatModel});
                $('#comment-field').val('');
            }

        },
    });

    return ChatsView;
});