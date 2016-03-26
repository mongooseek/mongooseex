//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/user',
    'text!templates/usr.html',
    'text!templates/login.html',
    'Moment'
], function (Backbone, _, $, UsrModel, usrTemplate, loginTemplate, moment) {
    console.log("I am inside USR view");
    var UsrView = Backbone.View.extend({
        el: '#vrakashy',
        //tmpl: _.template(usrTemplate),
        initialize: function () {
            console.log('Main user (usr) initialized');
            this.render();
            console.log(this);
            console.log(this.model);
        },
        events: {
            'click #login-button': 'logIn',
            'click #logup-button': 'logUp',
            'click #reset-button': 'resetPass',
            'click [href="#myApp/logup"]': 'logUpClicked',
            'click [href="#myApp/login"]': 'logInClicked',
            'click [href="#myApp/changepass"]': 'changePassClicked',
            'click #save-photo': 'savePhoto',
            'click #delete-photo': 'deletePhoto',
            'click [href="#myApp/logout"]': 'logOut'
        },
        render: function () {
            var $startForms = $('#start-forms');
            console.log('I am in render');
            var self = this;
            if (APP.usrId) {
                self.tmpl = _.template(usrTemplate);
                APP.io.emit('start', APP.usrId);
                $mainBlock = $('#main-block');
                if ($mainBlock.attr('id')) {
                    $mainBlock.remove();
                }
                $startForms.remove();
                console.log('I am inside userView render function!!!');
                var usrModel = this.model;
                this.$el.append(self.tmpl(usrModel.toJSON()));
                return this;
            } else {
                if ($startForms.attr('id')) {

                } else {
                    self.tmpl = _.template(loginTemplate);
                    self.$el.append(self.tmpl);

                }

            }
        },
        resetPass: function () {
            console.log('Verify your e-mail, there is link to change your password!!!');
            var $emailField;
            var userModel;
            var email;

            $emailField = $('#reset-form .input-email');
            email = $emailField.val();
            console.log(email);

        },
        logOut: function () {
            console.log("I am in logout");
            var $mainBlock = $('#main-block');
            var self = this;
            var usrModel = new UsrModel();
            usrModel.urlRoot = '/logout';
            usrModel.save(null, {
                success: function (response) {
                    //delete self.model;
                    //delete UsrModel;
                    delete self.model;
                    self.model = usrModel;
                    $mainBlock.remove();
                    delete APP.usrId;
                    //APP.io.disconnect();
                    Backbone.history.navigate('myApp/login', {replace: true});
                    self.render();
                },
                error: function (err) {
                    console.log(err);
                }
            });
        },
        logIn: function () {
            console.log('LOGIN button clicked!!');
            var $startForms = $('#start-forms');
            var self = this;
            var usrModel;
            usrModel = this.model;
            console.log(this.model);
            var email = $('#login-form .input-email').val();
            var pass = $('#login-form .input-password').val();
            usrModel.set({email: email, pass: pass});
            usrModel.urlRoot = '/login';
            usrModel.save(null, {
                success: function (response) {
                    console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                    APP.usrId = usrModel.get('_id');
                    usrModel.urlRoot = '/api/users';
                    usrModel.unset('pass', {silent: true});
                    $($startForms).remove();
                    Backbone.history.navigate('#myApp/main', {trigger: false});
                    self.render();
                },
                error: function (err) {
                    console.log('Failed to get user!');
                }
            });
        },
        logUp: function () {
            var $startForms = $('#start-forms');
            console.log('LOGUP button clicked!!');
            var city = {};
            var self = this;
            var usrModel = this.model;
            var firstName = $('#logup-form .input-first-name').val();
            var lastName = $('#logup-form .input-last-name').val();
            var email = $('#logup-form .input-email').val();
            var pass = $('#logup-form .input-password').val();
            var confirmPass = $('#logup-form .input-confirm-password').val();
            var dateOfBirth = $('#logup-form .input-birth').val();
            city.name = $('#logup-form .input-city').val();
            $.ajax({
                type: "GET",
                url: 'http://maps.google.com/maps/api/geocode/json?address=' + city.name + '?sensor=false',
                data: {},
                success: function (val) {
                    city.name = val.results[0].address_components[0].long_name;
                    city.lat = val.results[0].geometry.location.lat;
                    city.lng = val.results[0].geometry.location.lng;
                    usrModel.set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        pass: pass,
                        dateOfBirth: dateOfBirth,
                        city: city.name,
                        location: [city.lng, city.lat]
                    });
                    usrModel.urlRoot = '/logup';
                    usrModel.save(null, {
                        success: function (response) {
                            console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                            APP.usrId = usrModel.get('_id');
                            usrModel.urlRoot = '/api/users';
                            usrModel.unset('pass', {silent: true});
                            $startForms.remove();
                            self.render();
                        },
                        error: function (err) {
                            console.log('Failed to get user!');
                        }
                    });
                }
            });
        },
        logUpClicked: function () {
            $('#login-form').hide();
            $('#reset-form').hide();
            $('#logup-form').show();
        },
        logInClicked: function () {
            $('#logup-form').hide();
            $('#reset-form').hide();
            $('#login-form').show();
        },
        changePassClicked: function () {
            $('#logup-form').hide();
            $('#login-form').hide();
            $('#reset-form').show();
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
        }
    });
    return UsrView;
});