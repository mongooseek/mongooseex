define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/user',
    'text!templates/usr.html',
    'Moment',
    'socketio'
], function (Backbone, _, $, UsrModel, usrTemplate, moment, socketio) {
    console.log("I am inside user view");
    var UsrView = Backbone.View.extend({
        el: '#content',
        tmpl: _.template(usrTemplate),
        initialize: function () {
            console.log('Main user (usr) initialized');
            this.render();
        },
        events: {
            'click #in-sub': 'login',
            'click #up-sub': 'logup',
            'click #save-photo': 'savePhoto',
            'click #delete-photo': 'deletePhoto',
            'click #log-out': 'logOut',
            //'click #comment': 'comment',
            //'click #filter-friends': 'filterFriends'
        },
        logOut: function () {
            APP.usrId = {};
            delete this.model;
            var self = this;
            var usrModel = new UsrModel();
            usrModel.urlRoot = '/logout';
            $('#login-form').show();
            $('#photoPreviewForm').hide();
            $('#user-block').hide();
            usrModel.save(null, {
                success: function (response) {
                },
                error: function (err) {
                    console.log(err);
                }
            });
            self.model = new UsrModel();
            $('#user-block').remove();
            Backbone.history.navigate.origin;
        },
        login: function () {
            console.log('Signin button clicked!!');
            var self = this;
            console.log(this.model);
            var usrModel = this.model;
            var email = $('#input-email').val();
            var pass = $('#input-password').val();
            usrModel.set({email: email, pass: pass});
            usrModel.urlRoot = '/login';
            usrModel.save(null, {
                success: function (response) {
                    console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                    APP.usrId = usrModel.get('_id');
                    usrModel.urlRoot = '/api/users';
                    usrModel.unset('pass', {silent: true});
                    $('#login-form').hide();
                    self.render();
                },
                error: function (err) {
                    console.log('Failed to get user!');
                }
            });
        },
        logup: function () {
            console.log('Signup button clicked!!');
            var self = this;
            var usrModel = this.model;
            var firstName = $('#input-first-name').val();
            var lastName = $('#input-last-name').val();
            var email = $('#input-email').val();
            var pass = $('#input-password').val();
            var confirmPass = $('#input-confirm-password').val();
            usrModel.set({firstName: firstName, lastName: lastName, email: email, pass: pass});
            usrModel.urlRoot = '/logup';
            usrModel.save(null, {
                success: function (response) {
                    console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                    APP.usrId = usrModel.get('_id');
                    usrModel.urlRoot = '/api/users';
                    usrModel.unset('pass', {silent: true});
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
        render: function () {
            if (APP.usrId) {
                $('#login-form').hide();
                $('#photoPreviewForm').show();
                console.log('I am inside userView render function!!!');
                var self = this;
                var usrModel = this.model;
                this.$el.append(self.tmpl(usrModel.toJSON()));
                return this;
            }
        }
    });
    return UsrView;
});