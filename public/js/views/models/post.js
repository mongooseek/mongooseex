//View to deal with 'post' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/models/administrative/postForAdmin.html',
    'text!templates/models/administrative/postForUser.html'
], function (Backbone, _, $, adminTemplate, userTemplate) {
    console.log("I am inside post view");
    var PostView = Backbone.View.extend({
        el: ".posts-area",
        //tmpl: _.template(postTemplate),
        initialize: function () {
            console.log('New instance of PotsView initialized');
            this.render();
        },
        events: {},
        render: function () {
            var self = this;
            var userRole = $('tbody').attr('role');
            var creatorId = $('tbody').attr('creator');
            var ownerId = self.model.get('owner');
            if (userRole === 'admin' || creatorId === ownerId) {
                self.tmpl = _.template(adminTemplate);
                self.$el.prepend(self.tmpl(self.model.toJSON()));
            } else {
                self.tmpl = _.template(userTemplate);
                self.$el.prepend(self.tmpl(self.model.toJSON()));
            }
        }
    });

    return PostView;
});