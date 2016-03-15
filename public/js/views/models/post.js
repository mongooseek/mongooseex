//View to deal with 'post' model.
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
        }
    });
    return PostView;
});