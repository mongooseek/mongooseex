define([
    'Backbone',
    'jQuery',
    'collections/post',
    'text!templates/posts.html'
], function (Backbone, $, PostsCollection, postsTemplate) {

    var PostsView = Backbone.View.extend({
        el: "#under-user-buttons",
        tmpl: _.template(postsTemplate),
        initialize: function () {
            console.log("POST VIEW was INITIALIZED");
            this.render();
        },
        events: {
            //'click #posts-button': 'render'
        },
        render: function () {
            console.log("POST VIEW was INITIALIZED!!!");
            var self = this;
            console.log(this.collection);
            console.log(this.$el);
            $('#under-user-buttons').append('<div>' + 'Hello world' + '</div>');
        }
    });

    return PostsView;
});