define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/user',
    'text!templates/user.html',
    'text!templates/models/user.html',
    'Moment',
], function (Backbone, _, $, UserModel, userTemplate, usrTemplate, moment) {
    console.log("I am inside user view");
    var UserView = Backbone.View.extend({
        el: '#content',
        tmpl: _.template(userTemplate),
        initialize: function () {
            console.log('User VIEW and User MODEL initialized!!!');
            var self = this;
            console.log(this.model.get('_id'));
            this.render();
            if(self.model.get('_id')==APP.userId){
                console.log('trueeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
                self.model.on('click #save-photo', self.savePhoto)
            };
        },
        events: {
            'click #in-sub': 'login',
            'click #up-sub': 'logup',
            //'click #save-photo': 'savePhoto',
            'click #delete-photo': 'deletePhoto',
            'click #log-out': 'logOut'
        },
        logOut: function () {
            var userModel = new UserModel();
            userModel.urlRoot = '/logout';
            $('#login-form').show();
            $('#photoPreviewForm').hide();
            $('#user-block').hide();
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
            this.model.set({photo: photo, dateOfBirth: moment(this.model.dateOfBirth)});
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
            var templateForUsers = $('#template-for-users');
            if (templateForUsers.attr('id')) {
                var template = _.template(usrTemplate);
                $('#user-item').append(template(this.model.toJSON()));
                return this;
            }
            if (APP.userId) {
                $('#login-form').hide();
                $('#photoPreviewForm').show();
                console.log('I am inside userView render function!!!');
                var self = this;
                var uModel = this.model;
                console.log('uModel', uModel);
                console.log('self', self);
                this.$el.append(self.tmpl(uModel.toJSON()));
                return this;
            } else {
                console.log("We haven't USERMODEL!!!");
            }
        }
    });
    return UserView;
});