define([
    'Backbone',
    'collections/postsCollection'
], function (Backbone, PostsCollection) {

    var PostsView = Backbone.View.extend({
        el: "#add-posts",
        initialize: function () {
            var self = this;
            postsCollection = new PostsCollection();
            postsCollection.url = "/api/posts";
            console.log("I am before posts fecth!!!");
            postsCollection.fetch({
                success: function (response) {
                    postsCollection.each(function (post) {
                        self.$el.prepend('<div>' + post.get('content') + '</div>');
                    });

                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });

    return PostsView;
});