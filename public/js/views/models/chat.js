define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/chat',
    'text!templates/models/user.html',
    'Moment',
], function (Backbone, _, $, UserModel, usrTemplate, userTemplate, moment) {
    console.log("I am inside user view");
    var UserView = Backbone.View.extend({
        el: '#content',
        tmpl: _.template(usrTemplate),
        initialize: function () {
            console.log('User VIEW and User MODEL initialized!!!');
            this.render();
        },
        events: {},
        render: function () {
            var $templateForUsers = $('#template-for-users');
            if ($templateForUsers.attr('id')) {
                var template = _.template(userTemplate);
                $('#user-item').append(template(this.model.toJSON()));
                return this;
            }
        }
    });
    return UserView;
});