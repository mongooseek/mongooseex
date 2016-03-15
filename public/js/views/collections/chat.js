define([
    'Backbone',
    'jQuery',
    'collections/chat',
    'models/chat',
    'views/models/chat',
    'text!templates/collections/chat.html',
    'Moment',
    'socketio'
], function (Backbone, $, ChatsCollection, ChatModel, ChatView, chatsTemplate, moment, socketio) {

    var ChatsView = Backbone.View.extend({
        el: "#for-templates",
        tmpl: _.template(chatsTemplate),
        initialize: function () {
            console.log("CHATS VIEW was INITIALIZED");
            this.render();
            var self = this;
            APP.io = socketio.connect();
            APP.io.on('custom_response', function (data) {
                self.renderOne(data);
            });
        },
        events: {
            'click #comment': 'comment',
        },
        renderOne: function (model) {
            var model = new ChatModel(model);
            var chatView =  new ChatView({model: model});
        },
        comment: function () {
            var ownerName = $('#user-name').text();
            console.log('OWNERRRRRRRRRRRRRRR', typeof ownerName);
            console.log('Clicked comment');
            var content = $('#comment-field').val();
            if (content) {
                var chatModel = new ChatModel();
                chatModel.set({content: content, owner: APP.usrId, ownerName: ownerName});
                var chatView = new ChatView({model: chatModel});
                $('#comment-field').val('');
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
        }
    });

    return ChatsView;
});