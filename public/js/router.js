//Backbone router of application.
define([
    'Backbone',
    'Underscore',
    'models/user',
], function (Backbone, _, UsrModel) {
    var Router = Backbone.Router.extend({
        routes: {
            'myApp/newpass/:resetToken': 'newPass',
            'myApp/main': 'main',
            //'myApp/login': 'login',
            'myApp/logup': 'logup',
            'myApp/changepass': 'changepass',
            'myApp/logout': 'logout',
            'myApp/newpass/:resetToken': 'newPass',
            'myApp(/:content)': 'goToContent',
            'myApp/:content/conversation/:part2': 'conversation',
            'myApp/:content/:findParameter/:parameterValue': 'goToContent',
            '*any': 'start'
        },
        start: function () {
            console.log('START');
            Backbone.history.navigate('#myApp/main', {trigger: true});
        },
        newPass: function(resetToken){
          alert(resetToken);
        },
        main: function () {
            var self = this;
            var viewUrl;
            var usrModel;
            if (!self.model) {
                self.model = new UsrModel();
                self.model.urlRoot = '/login';
                self.model.save(null, {
                    success: function (response) {
                        console.log('Successfully GOT user with _id: ' + response.toJSON()._id);
                        APP.usrId = self.model.get('_id');
                        viewUrl = 'views/models/usr';
                        require([viewUrl], function (View) {
                            if (self.usrView) {
                                self.usrView.undelegateEvents();
                            }
                            self.usrView = new View({model: self.model});
                        });
                    },
                    error: function (error) {
                        delete self.model;
                        self.model = new UsrModel();
                        viewUrl = 'views/models/usr';
                        require([viewUrl], function (View) {
                            if (self.usrView) {
                                self.usrView.undelegateEvents();
                            }
                            self.usrView = new View({model: self.model});
                        });
                        Backbone.history.navigate('#myApp/login', {replace: true});
                    }
                });
            } else {
                viewUrl = 'views/models/usr';
                require([viewUrl], function (View) {
                    if (self.usrView) {
                        self.usrView.undelegateEvents();
                    }
                    self.usrView = new View({model: self.model});
                });
            }
        },
        login: function () {
            /*var self = this;
             console.log('LOGIN ROUTER TRIGERRED');
             var viewUrl = 'views/models/usr';
             require([viewUrl], function (View) {
             if (self.usrView) {
             self.usrView.undelegateEvents();
             }
             self.usrView = new View({model: self.model});
             });*/
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