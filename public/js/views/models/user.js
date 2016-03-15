//View to deal with 'user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/user',
    'text!templates/models/user.html',
    'Moment',
], function (Backbone, _, $, UserModel, userTemplate, moment) {
    console.log("I am inside user view");
    var UserView = Backbone.View.extend({
        el: '.user-item',
        tmpl: _.template(userTemplate),
        initialize: function () {
            console.log('User VIEW and User MODEL initialized!!!');
            this.render();
        },
        events: {},
        render: function () {
            var self = this;
            var $templateForUsers = $('#template-for-users');
            if ($templateForUsers.attr('id')) {
                self.$el.append(self.tmpl(this.model.toJSON()));
                return this;
            }
        }
    });
    return UserView;
});