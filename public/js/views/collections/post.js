//View to deal with 'post' collection.
define([
    'Backbone',
    'jQuery',
    'views/abstract/collections/base',
    'collections/post',
    'models/post',
    'views/models/post',
    'text!templates/collections/post.html'
], function (Backbone, $, BaseCollectionsView, PostsCollection, PostModel, PostView, postsTemplate) {

    var PostsView = BaseCollectionsView.extend({
        el: "#vrakashy",
        tmpl: _.template(postsTemplate),

        //<--" initialize: "--> removed to BaseCollectionsView.
        events: {
            'click #make-post': 'post'
        },
        render: function () {
            console.log('Clicked POSTS BUTTON');
            var self = this;
            var $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.length) {
                $temporaryTemplate.remove();
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
                postModel.set({content: content, owner: APP.usrId});
                console.log('USER ID FOR POST', APP.userId);
                var postView = new PostView({model: postModel});
                $('#posts-field').val('');
            }
        }
    });

    return PostsView;
});