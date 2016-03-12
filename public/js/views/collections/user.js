define([
    'Backbone',
    'jQuery',
    'collections/user',
    'models/user',
    'views/models/user',
    'text!templates/collections/user.html'
], function (Backbone, $, UsersCollection, UserModel, UserView, usersTemplate) {

    var UsersView = Backbone.View.extend({
        el: "#for-templates",
        tmpl: _.template(usersTemplate),
        initialize: function () {
            console.log("USER VIEW was INITIALIZED");
            this.render();
        },
        events: {
            'click #make-post': 'post'
        },
        render: function () {
            console.log('Clicked USERS BUTTON');
            var self = this;
            var temporaryTemplate = $('#temporary-template');
            if (temporaryTemplate) {
                temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl);
        },
        post: function () {
            var content = $('#posts-field').val();
            if (content) {
                var postModel = new PostModel();
                postModel.set({content: content});
                console.log('USER ID FOR POST', APP.userId);
                var postView = new PostView({model: postModel, owner: APP.userId});
            }
        }
    });

    return UsersView;
});