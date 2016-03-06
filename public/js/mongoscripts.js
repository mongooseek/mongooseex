//Backbone.Model.prototype.idAttribute = '_id';
var UserModel = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        fullName: '',
        dateOfBirth: '',
        age: '',
        location: '',
        email: '',
        role: 'user'
    },
    initialize: function () {
        console.log('Model initialized');
        //this.on('set _id', this.set({age: this.parse(this.get('dateOfBirth'))}));
    },
    loginOnReloadPage: function () {
        this.urlRoot = '/login';
        //this.set('_id', ':id');
        console.log('I am in loginOnReloadPage function');
        return this.save();
    },
    parse: function (response) {
        if (response.dateOfBirth) {
            response.age = (new Date() - new Date(response.dateOfBirth)) / (1000 * 60 * 60 * 24 * 365);
            if (response.age < 1) response.age = '';
        }
        if (response.firstName && response.lastName) response.fullName = response.firstName + ' ' + response.lastName;
        return response;
    }
});
var userModel = new UserModel();

var UserView = Backbone.View.extend({
    el: '#user-page',
    initialize: function () {
        console.log('View initialized');
        this.render();

    },

    render: function () {
        var self = this;
        console.log(this.$el);
        var user = userModel.toJSON();
        _.forEach(_.filter(userModel.keys(), function (key) {
            return ['fullName', 'dateOfBirth', 'age', 'email', 'location'].indexOf(key) !== -1;
        }), function (cleanKey) {
            self.$el.append('<div>' + cleanKey + ': ' + userModel.get(cleanKey) + '</div>');
        });
        return this;
    }
});

$(document).ready(function () {
    $('#in-sub').on('click', function () {
        var email = $('#input-email').val();
        var pass = $('#input-password').val();
        //userModel = new UserModel();
        userModel.set({email: email, pass: pass});
        userModel.urlRoot = '/login';
        userModel.save(null, {
            //wait: true,
            success: function (response) {
                console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                /*$('#input-first-name').val('');
                 $('#input-last-name').val('');
                 $('#input-email').val('');
                 $('#input-password').val('');
                 $('#input-confirm-password').val('');*/
                //userModel.unset('pass', {silent: true});
                userModel.urlRoot = '/users/api';
                console.log(this.urlRoot);
                userModel.unset('pass', {silent: true});
                console.dir(userModel.keys());
                $('#login-form').hide();
                var userView = new UserView({model: userModel});
                $('#user-block').show();
            },
            error: function (err) {
                console.log('Failed to get user!');
            }
        });
    });
    $('#up-sub').on('click', function () {
        var firstName = $('#input-first-name').val();
        var lastName = $('#input-last-name').val();
        var email = $('#input-email').val();
        var pass = $('#input-password').val();
        var passConfirmation = $('#input-confirm-password').val();
        /*$('#input-first-name').val('');
         $('#input-last-name').val('');
         $('#input-email').val('');
         $('#input-password').val('');
         $('#input-confirm-password').val('');*/
        userModel = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            pass: pass,
        });
        userModel.urlRoot = '/api/users';
        console.log('Clicked SignUp');
        userModel.save(null, {
            //wait: true,
            success: function (response) {
                console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                userModel.unset(['pass', '__v'], {silent: true});
                console.dir(userModel.keys());
                $('#login-form').hide();
                var userView = new UserView({model: userModel});
                $('#user-block').show();
            },
            error: function (err) {
                console.log('Failed to get user!');
            }
        });
    });
});

var BaseCollection = Backbone.Collection.extend({
    content: null,
    contentType: function () {
        return '/' + this.content + '/'
    },
    url: function () {

    }
});

var UsersCollection = Backbone.Collection.extend({
    //content: 'users'
});