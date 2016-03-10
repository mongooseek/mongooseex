define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/userModel',
], function (Backbone, _, $, UserModel) {
    console.log("I am inside user view");
    var UserView = Backbone.View.extend({
        //model: new UserModel(),
        el: '#in-sub',
        initialize: function () {
            console.log('View initialized');
        },
        events: {
            'click': 'login'
        },
        login: function () {
            console.log('Login button clicked!!');
            var self = this;
            var uModel = this.model;
            var email = $('#input-email').val();
            var pass = $('#input-password').val();
            uModel.set({email: email, pass: pass});
            uModel.urlRoot = '/login';
            uModel.save(null, {
                success: function (response) {
                    console.log('Response', response);
                    console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                    /*$('#input-first-name').val('');
                     $('#input-last-name').val('');
                     $('#input-email').val('');
                     $('#input-password').val('');
                     $('#input-confirm-password').val('');*/
                    uModel.urlRoot = '/users/api';
                    uModel.unset('pass', {silent: true});
                    $('#login-form').hide();
                    $('#user-block').show();
                    self.render();
                    console.log('I am after render!!!!!!');
                    APP.logined = true;
                },
                error: function (err) {
                    console.log('Failed to get user!');
                }
            });
        },
        render: function () {
            console.log('I am inside userView render function!!!');
            var self = this;
            var uModel = this.model;
            console.log('uModel', uModel);
            console.log('self', self);
            _.forEach(_.filter(uModel.keys(), function (key) {
                return ['fullName', 'dateOfBirth', 'age', 'email', 'location'].indexOf(key) !== -1;
            }), function (cleanKey) {
                $('#user-page').append('<div>' + cleanKey + ': ' + uModel.get(cleanKey) + '</div>');
            });
            return this;
        }
    });
    return UserView;
});