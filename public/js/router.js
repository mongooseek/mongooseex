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
            var userModel = new UserModel();
            userModel.urlRoot = '/login';
            userModel.save(null, {
                success: function (response) {
                    console.log('BIG SUCCESS');
                },
                error: function (err) {
                    console.log('SUCCESS BUT NOT BIG');
                }
            });
            var userId = APP.userId;
            if (APP.userId) {
                console.log('USER LOGINED---------------------------->');
            } else {
                console.log('we haven\'t user id');
                //this.goToDashboard();
            }
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
            var userModel = new UserModel();
            var userView = new UserView({model: userModel});
        }
    });
    return Router;
});