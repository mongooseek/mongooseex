//Backbone router of application.
define([
    'Backbone',
    'Underscore',
    'models/user',
], function (Backbone, _, UsrModel) {
    var Router = Backbone.Router.extend({
        routes: {
            'myApp/main': 'main',
            'myApp/login': 'login',
            'myApp/logup': 'logup',
            'myApp/logout': 'logout',
            'myApp(/:content)': 'goToContent',
            'myApp/:content/conversation/:part2': 'conversation',
            'myApp/:content/:findParameter/:parameterValue': 'goToContent',
            '*any': 'start'
        },
        start: function () {
            Backbone.history.navigate('#myApp/main', {trigger: true});
        },
        main: function () {
            var self = this;
            var viewUrl;
            var usrModel = new UsrModel();
            usrModel.urlRoot = '/login';
            usrModel.save(null, {
                success: function (response) {
                    console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                    APP.usrId = usrModel.get('_id');
                    viewUrl = 'views/models/usr';
                    require([viewUrl], function (View) {
                        if (View) {
                            delete View;
                        }
                        var usrView = new View({model: usrModel});
                    });
                },
                error: function (error) {
                    delete UsrModel;
                    Backbone.history.navigate('#myApp/login', {trigger: true});
                }
            });
        },
        login: function () {
            var usrModel = new UsrModel();
            var self = this;
            console.log('LOGIN ROUTER TRIGERRED');
            var viewUrl = 'views/models/usr';
            require([viewUrl], function (View) {
                if (View) {
                    delete View;
                    console.log('VIEW deleted');
                }
                var usrView = new View({model: usrModel});
                console.log(usrView);
                console.log(usrModel);
            });
        },
        goToContent: function (content, findParameter, parameterValue) {
            var content;
            if (APP.usrId) {
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
                    collection.content = (!parameterValue) ? collection.content : collection.content + '/' + findParameter + '/' + parameterValue;
                    self.collection = collection;
                    collection.on('reset', function () {
                        self.renderView(View);
                    });
                    collection.fetch({reset: true});
                });
            } else {
                Backbone.history.navigate('#myApp/main', {trigger: true});
            }
        },
        conversation: function (content, part2) {
            if (APP.usrId) {
                var $forReplicas;
                $forReplicas = $('#template-for-replicas');
                if ($forReplicas.attr('id')) {
                    $forReplicas.remove();
                }
                console.log('conversation activated');
                var collectionContent = 'api/replicas/' + part2;
                var self = this;
                var collectionUrl;
                var viewUrl;
                collectionUrl = 'collections/replica';
                viewUrl = 'views/collections/replica';
                require([collectionUrl, viewUrl], function (Collection, View) {
                    var collection = new Collection();
                    self.collection = collection;
                    self.collection.content = collectionContent;
                    collection.on('reset', function () {
                        self.renderView(View);
                    });
                    collection.fetch({reset: true});
                });
            } else {
                Backbone.history.navigate('#myApp/main', {trigger: true});
            }
        },
        renderView: function (View) {
            if (this.view) {
                this.view.undelegateEvents();
            }
            this.view = new View({collection: this.collection});
        }
    });
    return Router;
});