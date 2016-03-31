//View to deal with 'post' model.
define([
    'views/abstract/all',
    'Underscore',
    'jQuery',
    'text!templates/models/administrative/postForAdmin.html',
    'text!templates/models/administrative/postForUser.html'
], function (AllView, _, $, adminTemplate, userTemplate) {

    var PostView = AllView.extend({

        el: ".posts-area",

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