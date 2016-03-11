define([
    'Backbone',
    'collections/post',
    'text!templates/posts.html'
], function (Backbone, PostsCollection, postsTemplate) {

    var PostsView = Backbone.View.extend({
        //el: "#add-posts",
        el: "#content",
        tmpl: _.template(postsTemplate),
        initialize: function () {
            console.log("POST VIEW was INITIALIZED");
            this.render();
        },
        events: {
            //'click #posts-button': 'render'
        },
        render: function () {
            var self = this;
            console.log(this.collection);
            /*postsCollection = new PostsCollection();
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
             });*/
        }
    });

    return PostsView;
});