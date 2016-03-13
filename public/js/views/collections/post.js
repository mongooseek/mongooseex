define([
    'Backbone',
    'jQuery',
    'collections/post',
    'models/post',
    'views/models/post',
    'text!templates/collections/post.html'
], function (Backbone, $, PostsCollection, PostModel, PostView, postsTemplate) {

    var PostsView = Backbone.View.extend({
        el: "#for-templates",
        tmpl: _.template(postsTemplate),
        initialize: function () {
            console.log("POST VIEW was INITIALIZED");
            this.render();
        },
        events: {
            'click #make-post': 'post'
        },
        render: function () {
            console.log('Clicked POSTS BUTTON');
            var self = this;
            var temporaryTemplate = $('.temporary-template');
            if (temporaryTemplate.attr('id')) {
                temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl);
            var posts = this.collection;
            posts.forEach(function (postModel) {
                var view = new PostView({model: postModel});
            });
        },
        post: function () {
            var content = $('#posts-field').val();
            if (content) {
                var postModel = new PostModel();
                postModel.set({content: content, owner: APP.userId});
                console.log('USER ID FOR POST', APP.userId);
                var postView = new PostView({model: postModel, owner: APP.userId});
            }
        }
    });

    return PostsView;
});