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
                    APP.userId = userModel.get('_id');
                    var userView = new UserView({model: userModel});
                    console.log('BIG SUCCESS');
                },
                error: function (err) {
                    var userView = new UserView({model: userModel});
                    console.log('SUCCESS BUT NOT BIG');
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
            var collectionUrl;
            if (!content) {
                return self.goToDashboard();
            }
            collectionUrl = 'collections/' + content;
            viewUrl = 'views/collections/' + content;
            require([collectionUrl, viewUrl], function (Collection, View) {
                var collection = new Collection();
                self.collection = collection;
                collection.on('reset', function () {
                    self.renderView(View);
                });
                collection.fetch({reset: true});
            });
        },
        renderView: function (View) {
            if (this.view) {
                this.view.undelegateEvents();
            }
            this.view = new View({collection: this.collection});
        },
        goToDashboard: function () {
        }
    });
    return Router;
});