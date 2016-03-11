define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/user',
    'models/post',
    'views/models/user'
], function (Backbone, _, $, UserModel, UserView) {

    console.log('I am inside root!!!');
    var userModel;
    var postModel;

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
                    var postsView = new PostsView({model: postModel});
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
});