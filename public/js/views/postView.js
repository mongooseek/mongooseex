define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/postModel',
], function (Backbone, _, $, PostModel) {
    console.log("I am inside post view");
    var PostView = Backbone.View.extend({
        model: new PostModel(),
        el: "#make-post",
        initialize: function () {
            console.log('New instance of PotsView initialized');
        },
        events: {
            'click': 'post'
        },
        post: function () {
            console.log('Post button clicked!!');
            var self = this;
            var pModel = this.model;
            var post = $("#posts").val();
            pModel.set({title: "New post", owner: userModel.get("_id"), content: post});
            pModel.urlRoot = "/api/posts";
            console.log(pModel.urlRoot);
            pModel.save(null, {
                    success: function (response) {
                        self.$el.prepend('<div>' + pModel.get('content') + '</div>')
                    },
                    error: function (err) {

                    }
                }
            );
        }
    });
    return PostView;
});