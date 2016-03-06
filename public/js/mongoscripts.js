Backbone.Model.prototype.idAttribute = '_id';

var UserModel = Backbone.Model.extend({
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
    },
    parse: function (response) {
        if (!response.dateOfBirths) {
            response.dateOfBirth = new Date();
            response.age = (new Date() - new Date(response.dateOfBirth)) / (1000 * 60 * 60 * 24 * 365);
            if (response.age < 1) response.age = ':)';
        }
        if (response.firstName && response.lastName) response.fullName = response.firstName + ' ' + response.lastName;
        return response;
    }
});
var userModel;

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

var PostModel = Backbone.Model.extend({});
var postModel;
var PostView = Backbone.View.extend({
    el: "#add-posts",
    initialize: function () {
        postModel = new PostModel();
        var self = this;
        var post = $("#posts").val();
        console.log("Posts view initialized!!!!!");
        postModel.set({title: "New post", owner: userModel.get("_id"), content: post});
        postModel.urlRoot = "/api/posts";
        postModel.save(null, {
                success: function (response) {
                    self.$el.prepend('<div>' + postModel.get('content') + '</div>')
                },
                error: function (err) {

                }
            }
        );
    }
});
var PostsCollection = Backbone.Collection.extend({});
var postsCollection;
var PostsView = Backbone.View.extend({
    el: "#add-posts",
    initialize: function () {
        var self = this;
        postsCollection = new PostsCollection();
        postsCollection.url = "/api/posts";
        console.log("I am before posts fecth!!!");
        postsCollection.fetch({
            success: function (response) {
                postsCollection.each(function (post) {
                    self.$el.prepend('<div>' + post.get('content') + '</div>');
                });

            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});

$(document).ready(function () {
    $("#make-post").on('click', function () {
        var postView = new PostView();
    });
    $('#in-sub').on('click', function () {
        var email = $('#input-email').val();
        var pass = $('#input-password').val();
        //userModel = new UserModel();
        userModel = new UserModel({email: email, pass: pass});
        userModel.urlRoot = '/login';
        userModel.save(null, {
            //wait: true,
            success: function (response) {
                console.log('Response', response);
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
                var postsView = new PostsView();
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

var UsersCollection = Backbone.Collection.extend({});