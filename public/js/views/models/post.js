define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/models/post.html'
], function (Backbone, _, $, postTemplate) {
    console.log("I am inside post view");
    var PostView = Backbone.View.extend({
        el: "#posts-area",
        tmpl: _.template(postTemplate),
        initialize: function () {
            console.log('New instance of PotsView initialized');
            console.log('Model', this.model);
            this.render();
        },
        events: {
            //'click #make-post': 'post'
        },
        render: function () {
            var self = this;
            var postModel = this.model;
            if (postModel.get('_id')) {
                self.$el.prepend(self.tmpl({content: postModel.get('content')}));
            } else {
                postModel.save(null, {
                    success: function (response) {
                        self.$el.prepend(self.tmpl({content: postModel.get('content')}));
                    },
                    error: function (err) {
                        console.log('Failed to save post');
                    }
                });
            }
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