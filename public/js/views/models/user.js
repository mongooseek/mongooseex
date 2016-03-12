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
        tmpl: _.template(userTemplate),
        initialize: function () {
            console.log('User VIEW and User MODEL initialized!!!');
            this.render();
        },
        events: {
            'click #in-sub': 'login',
            'click #up-sub': 'logup',
            'click #save-photo': 'savePhoto',
            'click #delete-photo': 'deletePhoto'
        },
        logup: function () {
            console.log('Signup button clicked!!');
            var self = this;
            userModel = this.model;
            var firstName = $('#input-first-name').val();
            var lastName = $('#input-last-name').val();
            var email = $('#input-email').val();
            var pass = $('#input-password').val();
            var confirmPass = $('#input-confirm-password').val();
            userModel.set({firstName: firstName, lastName: lastName, email: email, pass: pass});
            userModel.urlRoot = '/logup';
            console.log('urlRoot', userModel.urlRoot);
            userModel.save(null, {
                success: function (response) {
                    console.log('Response', response);
                    console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                    APP.userId = userModel.get('_id');
                    userModel.urlRoot = '/api/users';
                    userModel.unset('pass', {silent: true});
                    $('#login-form').hide();
                    self.render();
                },
                error: function (err) {
                    console.log('Failed to get user!');
                }
            });
        },
        savePhoto: function () {
            console.log("Clicked save photo button.");
            var photo = $('#preview').attr('src');
            this.savePhotoFunc(photo);
        },
        deletePhoto: function () {
            console.log("Clicked delete photo button.");
            var photo = this.model.defaults.photo;
            this.savePhotoFunc(photo);
        },
        savePhotoFunc: function (photo) {
            this.model.set('photo', photo);
            this.model.urlRoot = '/api/users';
            this.model.save();
            $('#preview').attr('src', this.model.get('photo'));
        },
        login: function () {
            console.log('Signin button clicked!!');
            var self = this;
            userModel = this.model;
            var email = $('#input-email').val();
            var pass = $('#input-password').val();
            userModel.set({email: email, pass: pass});
            userModel.urlRoot = '/login';
            userModel.save(null, {
                success: function (response) {
                    console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                    APP.userId = userModel.get('_id');
                    userModel.urlRoot = '/api/users';
                    userModel.unset('pass', {silent: true});
                    $('#login-form').hide();
                    self.render();
                },
                error: function (err) {
                    console.log('Failed to get user!');
                }
            });
        },
        render: function () {
            if (APP.userId) {
                $('#login-form').hide();
                $('#photoPreviewForm').show();
                console.log('I am inside userView render function!!!');
                var self = this;
                var uModel = this.model;
                console.log('uModel', uModel);
                console.log('self', self);
                this.$el.append(self.tmpl);
                _.forEach(_.filter(uModel.keys(), function (key) {
                    return ['fullName', 'dateOfBirth', 'age', 'email', 'location'].indexOf(key) !== -1;
                }), function (cleanKey) {
                    $('#user-page').append('<div>' + cleanKey + ': ' + uModel.get(cleanKey) + '</div>');
                });
                $('#preview').attr({src: uModel.get('photo')});
                return this;
            } else {
                console.log("We haven't USERMODEL!!!");
            }
        }
    });
    return UserView;
});