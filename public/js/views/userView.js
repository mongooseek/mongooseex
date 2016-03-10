define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/userModel',
    'text!templates/user.html',
], function (Backbone, _, $, UserModel, userTemplate) {
    console.log("I am inside user view");
    var UserView = Backbone.View.extend({
        model: new UserModel(),
        el: '#content',
        //tmpl: _.template(userTemplate),
        initialize: function () {
            console.log('View initialized');
        },
        events: {
            'click #in-sub': 'login',
            'click #up-sub': 'logup',
            'click #su': 'savePhoto',
        },
        savePhoto: function () {
            console.log("Clicked save photo button.");
            var photoSrc = $('#preview').attr('src');
            if (photoSrc) {
                $('div.user-photo>img').remove();
                $('i#default-photo').hide();
                $('div.user-photo').append('<img>');
                $('div.user-photo>img').attr({src: $('#preview').attr('src'), width: '200'});
                $('#preview').removeAttr('src');
            } else {
                $('div.user-photo>img').remove();
                $('i#default-photo').show();
            }
        },
        logup: function () {
            console.log('Signup button clicked!!');
        },
        login: function () {
            console.log('Signin button clicked!!');
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
                    uModel.urlRoot = '/users/api';
                    uModel.unset('pass', {silent: true});
                    $('#login-form').hide();
                    $('#photoPreviewForm').show();
                    self.render();
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
            self.$el.append(_.template(userTemplate));
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