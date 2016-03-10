define([
    'Backbone',
    'collections/postsCollection',
    'text!templates/posts.html'
], function (Backbone, PostsCollection, postsTemplate) {

    var PostsView = Backbone.View.extend({
        //el: "#add-posts",
        el: "#content",
        tmpl: _.template(postsTemplate),
        initialize: function () {
            console.log("Post view was initialized");
        },
        events: {
            'click #posts-buton': 'render'
        },
        render: function () {
            var self = this;
            postsCollection = new PostsCollection();
            console.log("I am before posts fecth!!!");
            postsCollection.fetch({
                success: function (response) {
                    self.$el.append(self.tmpl);
                    postsCollection.each(function (post) {
                        $('#add-posts').prepend('<div>' + post.get('content') + '</div>');
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