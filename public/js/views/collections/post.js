define([
    'Backbone',
    'jQuery',
    'collections/post',
    'models/post',
    'views/models/post',
    'text!templates/posts.html'
], function (Backbone, $, PostsCollection, PostModel, PostView, postsTemplate) {

    var PostsView = Backbone.View.extend({
        el: "#under-user-buttons",
        tmpl: _.template(postsTemplate),
        initialize: function () {
            console.log("POST VIEW was INITIALIZED");
            this.render();
        },
        events: {
            'click #make-post': 'post'
        },
        render: function () {
            console.log("POST VIEW was INITIALIZED!!!");
            var self = this;
            console.log(this.collection);
            console.log(this.$el);
            $('#under-user-buttons').append('<input id="posts-field">');
            $('#under-user-buttons').append('<a id="make-post" class="btn btn-default">' + '<i class="fa fa-book">' + '</i>' + 'Posts' + '</a>');
            $('#under-user-buttons').append('<div id="post-area">');
            _.forEach(self.collection, function (post) {
                console.log(post);
            });
        },
        post: function () {
            var postModel = new PostModel();
            postModel.set({content: $('#posts-field').val()});
            var postView = new PostView({model: postModel});
        }
    });

    return PostsView;
});