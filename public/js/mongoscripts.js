//Backbone.Model.prototype.idAttribute = '_id';
var UserModel = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        //login: '',
        //pass: '',
        //name: '',
        //surname: '',
        //dateOfBirth: '',
        //location: '',
        role: 'user',
        //authorized: '',
        //confirmed: ''
    },
    initialize: function () {
        this.on("change:_id", function () {
            this.urlRoot = '/api/users'
        })
    }
});
var userModel;

var BaseCollection = Backbone.Collection.extend({
    content: null,
    contentType: function () {
        return '/' + this.content + '/'
    },
    url: function () {

    }
});

var UsersCollection = Backbone.Collection.extend({
    content: 'users'
});

var UserView = Backbone.View.extend({
    el: '#user-page',
    initialize: function () {
        console.log('Hello world from console!');
        this.render();

    },

    render: function () {
        console.log('userModel1000', userModel);
        var user = userModel.toJSON();
        console.log('user2000', user);
        console.log('this', this);
        console.log('this.el', this.el);
        console.dir(this.$el);
        this.$el.append('<div>' + user.firstName + ' ' + user.lastName + '</div>');
        console.dir(this)
        return this;
    }
});

$(document).ready(function () {
    $('#in-sub').on('click', function () {
        var email = $('#input-email').val();
        var pass = $('#input-password').val();
        userModel = new UserModel({
            email: email,
            pass: pass
        });
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
                userModel.unset('pass', {silent: true});
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
                userModel.unset('pass', {silent: true});
                $('#login-form').hide();
            },
            error: function (err) {
                console.log('Failed to get user!');
            }
        });
    });
});
