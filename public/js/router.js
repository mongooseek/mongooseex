//Backbone router of application.
define([
    'Backbone',
    'Underscore',
    'models/user',
    'views/models/usr'
], function (Backbone, _, UsrModel, UsrView) {
    var Router = Backbone.Router.extend({
        routes: {

            '': 'start',
            'myApp(/:content)': 'goToContent',
            'myApp/user/friend': 'goToFriends',
            'myApp/login': 'login',
            'myApp/logup': 'logup',
            'myApp/:content/conversation/:part2': 'conversation',
            '*any': 'goToDashboard'
        },
        initialize: function () {
            var usrModel = new UsrModel();
            usrModel.urlRoot = '/login';
            console.log('UsrView', UsrView);
            usrModel.save(null, {
                success: function (response) {
                    APP.usrId = usrModel.get('_id');
                    APP.loggedIn = true;
                    var usrView = new UsrView({model: usrModel});
                },
                error: function (err) {
                    var usrView = new UsrView({model: usrModel});
                }
            });
        },
        conversation: function (content, part2) {
            console.log('conversation activated');
            var apiUrl = '/api/replicas/' + part2 + '/';
            var self = this;
            var collectionUrl;
            var viewUrl;
            collectionUrl = 'collections/replica';
            viewUrl = 'views/collections/replica';
            require([collectionUrl, viewUrl], function (Collection, View) {
                var collection = new Collection();
                self.collection = collection;
                self.collection.url = apiUrl;
                collection.on('reset', function () {
                    self.renderView(View);
                });
                collection.fetch({reset: true});
            });
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
            require([collectionUrl, viewUrl], function (Collection, View) {
                var collection = new Collection();
                self.collection = collection;
                collection.on('reset', function () {
                    self.renderView(View);
                });
                collection.fetch({reset: true});
            });
        },
        goToFriends: function () {

        },
        renderView: function (View) {
            if (this.view) {
                this.view.undelegateEvents();
            }
            this.view = new View({collection: this.collection});
        },
        goToDashboard: function () {
            console.log('Go to dashboard!!!');
        },
        start: function () {
            self.goToDashboard();
        },
        login: function () {
            console.log('LOGIN FUNCTION TRIGERED');
        }
    });
    return Router;
});