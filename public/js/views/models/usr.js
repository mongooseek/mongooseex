//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/user',
    'text!templates/usr.html',
    'Moment',
    'socketio'
], function (Backbone, _, $, UsrModel, usrTemplate, moment) {
    console.log("I am inside user view");
    var UsrView = Backbone.View.extend({
        el: '#vrakashy',
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
            //Backbone.history.navigate.origin;
        },
        login: function () {
            console.log('Signin button clicked!!');
            var $loginForm = $('#login-form');
            var self = this;
            var usrModel = new UsrModel();
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
                    self.model = usrModel;
                    $('#login-form').remove();
                    Backbone.history.navigate('#myApp/main', {trigger: true});
                    self.render();
                },
                error: function (err) {
                    console.log('Failed to get user!');
                }
            });
        },
        logup: function () {
            console.log('Signup button clicked!!');
            var city = {};
            var self = this;
            var usrModel = this.model;
            var firstName = $('#input-first-name').val();
            var lastName = $('#input-last-name').val();
            var email = $('#input-email').val();
            var pass = $('#input-password').val();
            var confirmPass = $('#input-confirm-password').val();
            city.name = $('#input-city').val();
            $.ajax({
                type: "GET",
                url: 'http://maps.google.com/maps/api/geocode/json?address=' + city.name + '?sensor=false',
                data: {},
                success: function (val) {
                    city.name = val.results[0].address_components[0].long_name;
                    city.lat = val.results[0].geometry.location.lat;
                    city.lng = val.results[0].geometry.location.lng;
                    usrModel.set({firstName: firstName, lastName: lastName, email: email, pass: pass, city: city});
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
            console.log('I am in render');
            var self = this;
            if (APP.usrId) {
                APP.io.emit('start', APP.usrId);
                $mainBlock = $('#main-block');
                if ($mainBlock.attr('id')) {
                    $mainBlock.remove();
                }
                $('#login-form').hide();
                $('#photoPreviewForm').show();
                console.log('I am inside userView render function!!!');
                var self = this;
                var usrModel = this.model;
                this.$el.append(self.tmpl(usrModel.toJSON()));
                return this;
            } else {
                var loginTemplateUrl = 'text!templates/login.html';
                require([loginTemplateUrl], function (template) {
                    self.$el.append(template);
                });

            }
        }
    });
    return UsrView;
});