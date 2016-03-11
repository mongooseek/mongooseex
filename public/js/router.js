define([
    'Backbone',
    'models/user',
    'views/models/user',
    'models/post',
    'views/models/post',
    'collections/post',
    'views/collections/post'
], function (Backbone, UserModel, UserView, PostModel, PostView, PostsCollection, PostsView) {
    var Router = Backbone.Router.extend({
        routes: {
            'myApp(/:content)': 'goToContent',
            'myApp/login': 'login',
            'myApp/logup': 'logup',
            '*any': 'goToDashboard'
        },
        initialize: function () {
            var userId;
            var self = this;
            var userModel = new UserModel();
            var userView;
            userModel.urlRoot = '/login';
            userModel.save(null, {
                success: function (response) {
                    console.log('Response', response);
                    userModel.urlRoot = '/api/users/';
                    self.userModel = userModel;
                    self.renderSingleView(UserView);
                },
                error: function (err) {
                    self.renderSingleView(UserView);
                    self.login();
                }
            });
        },
        login: function () {
            console.log('LOGIN FUNCTION TRIGERED');
        },
        goToContent: function (content) {
            console.log('The content is', content);
            var self = this;
            var collectionUrl;
            var viewUrl;
            if (!content) {
                return self.goToDashboard();
            }
            collectionUrl = 'collections/' + content;
            viewUrl = 'views/collections/' + content;
            console.log(collectionUrl, viewUrl);
            require([collectionUrl, viewUrl], function (Collection, View) {
                var collection = new Collection();
                self.collection = collection;
                collection.on('reset', function () {
                    self.renderView(View);
                });
                collection.fetch({reset: true});
            });
        },
        renderSingleView: function (View) {
            if (this.view) {
                this.view.undelegateEvents();
            }
            this.view = new View({model: this.userModel});
        },
        renderView: function (View) {
            if (this.view) {
                this.view.undelegateEvents();
            }
            this.view = new View({collection: this.collection});
        },
        goToDashboard: function () {
            console.log(this.userId);
            /*console.log('Signin button clicked!!');
             var uModel = new UserModel();
             var email = $('#input-email').val();
             var pass = $('#input-password').val();
             uModel.set({email: email, pass: pass});
             uModel.urlRoot = '/login';
             uModel.save(null, {
             success: function (response) {
             console.log('Response', response);
             console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
             uModel.urlRoot = '/users/api';
             uModel.unset('pass', {silent: true});
             $('#login-form').hide();
             $('#photoPreviewForm').show();
             //self.render();
             console.log(uModel);
             },
             error: function (err) {
             console.log('Failed to get user!');
             }
             });*/
        }
    });
    return Router;
});