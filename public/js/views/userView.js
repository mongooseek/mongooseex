define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/userModel',
], function (Backbone, _, $, UserModel) {
    console.log("I am inside user view");
    var UserView = Backbone.View.extend({
        el: '#in-sub',
        initialize: function () {
            console.log('View initialized');

            //this.render();

        },

        events: {
            'click': 'login'
        },

        login: function () {
            console.log('Login button clicked!!');
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
                    userModel.urlRoot = '/users/api';
                    console.log(this.urlRoot);
                    userModel.unset('pass', {silent: true});
                    console.dir(userModel.keys());
                    $('#login-form').hide();
                    var userView = new UserView({model: userModel});
                    $('#user-block').show();
                    var postsView = new PostsView(/*{model: postModel}*/);
                },
                error: function (err) {
                    console.log('Failed to get user!');
                }
            });
        },
        render: function () {
            //var uModel = userModel;
            var self = this;
            console.log(this.model);
            _.forEach(_.filter(self.model.keys(), function (key) {
                return ['fullName', 'dateOfBirth', 'age', 'email', 'location'].indexOf(key) !== -1;
            }), function (cleanKey) {
                self.$el.append('<div>' + cleanKey + ': ' + self.model.get(cleanKey) + '</div>');
            });
            return this;
        }
    });

    return UserView;
});