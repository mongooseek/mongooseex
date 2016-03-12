define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/post',
], function (Backbone, _, $, PostModel) {
    console.log("I am inside post view");
    var PostView = Backbone.View.extend({
        //model: new PostModel(),
        //el: "#make-post",
        el: "#content",
        initialize: function () {
            console.log('New instance of PotsView initialized');
            console.log('Model', this.model);
            this.render();
        },
        events: {
            //'click #make-post': 'post'
        },
        render: function () {
            $('#posts-area').prepend(this.model.get('content'));
        },

        post: function () {
            console.log('Post button clicked!!');
            var self = this;
            var pModel = this.model;
            var post = $("#posts-field").val();
            pModel.set({title: "New post", owner: APP.userId, content: post});
            pModel.urlRoot = "/api/posts";
            console.log(pModel.urlRoot);
            pModel.save(null, {
                    success: function (response) {
                        $('#post').append(pModel.get('content'));
                    },
                    error: function (err) {

                    }
                }
            );
        }
    });
    return PostView;
});