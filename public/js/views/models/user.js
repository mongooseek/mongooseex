define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/user',
    'text!templates/user.html',
], function (Backbone, _, $, UserModel, userTemplate) {
    console.log("I am inside user view");
    var UserView = Backbone.View.extend({
        el: '#content',
        //tmpl: _.template(userTemplate),
        initialize: function () {
            console.log('User VIEW and User MODEL initialized!!!');
            //this.render();
        },
        events: {
            'click #in-sub': 'login',
            'click #save-photo': 'savePhoto'
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
            var userModel = new UserModel();
            this.model = userModel;
            var email = $('#input-email').val();
            var pass = $('#input-password').val();
            userModel.set({email: email, pass: pass});
            userModel.urlRoot = '/login';
            userModel.save(null, {
                success: function (response) {
                    console.log('Response', response);
                    console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                    APP.userId = userModel.get('_id');
                    userModel.urlRoot = '/users/api'
                    userModel.unset('pass', {silent: true});
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
            if (this.model) {
                $('#login-form').hide();
                $('#photoPreviewForm').show();
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
            } else {
                console.log("We haven't USERMODEL!!!");
            }
        }
    });
    return UserView;
});