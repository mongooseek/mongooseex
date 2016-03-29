//View to deal with 'post' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/models/post.html'
], function (Backbone, _, $, postTemplate) {
    console.log("I am inside post view");
    var PostView = Backbone.View.extend({
        el: ".posts-area",
        tmpl: _.template(postTemplate),
        initialize: function () {
            console.log('New instance of PotsView initialized');
            console.log('Model', this.model);
            this.render();
        },
        events: {},
        render: function () {
            var self = this;
            if (self.model.get('_id')) {
                console.log(self.model);
                self.$el.prepend(self.tmpl(self.model.toJSON()));
            }
        }
    });
    return PostView;
});