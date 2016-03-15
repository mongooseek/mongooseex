//Backbone router of application.
define([
    'Backbone',
    'models/user',
    'views/models/usr'
], function (Backbone, UsrModel, UsrView) {
    var Router = Backbone.Router.extend({
        routes: {
            'myApp(/:content)': 'goToContent',
            'myApp/user/friend': 'goToFriends',
            'myApp/login': 'login',
            'myApp/logup': 'logup',
            '*any': 'goToDashboard'
        },
        initialize: function () {
            APP.init = 'Hi!!!';
            var usrModel = new UsrModel();
            usrModel.urlRoot = '/login';
            console.log('UsrView', UsrView);
            usrModel.save(null, {
                success: function (response) {
                    APP.usrId = usrModel.get('_id');
                    var usrView = new UsrView({model: usrModel});
                },
                error: function (err) {
                    var usrView = new UsrView({model: usrModel});
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
            require([collectionUrl, viewUrl], function (Collection, View) {
                var collection = new Collection();
                self.collection = collection;
                collection.on('reset', function () {
                    self.renderView(View);
                });
                collection.fetch({reset: true});
            });
        },
        goToFriends: function(){

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