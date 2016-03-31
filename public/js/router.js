//Backbone router of application.
define([
    'Backbone',
    'Underscore',
    'models/user',
], function (Backbone, _, UsrModel) {

    var Router = Backbone.Router.extend({

        //Web-application routes.
        routes: {
            'myApp/newpass/:resetToken': 'newPass',
            'myApp/main': 'main',
            'myApp/start/:content(/:token)': 'start',
            'myApp/logout': 'logout',
            'myApp(/:content)': 'goToContent',
            'myApp/:content/conversation/:part2': 'conversation',
            'myApp/:content/:findParameter/:parameterValue': 'goToContent',
            '*any': 'default'
        },

        //Method for default route.
        default: function () {
            Backbone.history.navigate('#myApp/main', {trigger: true});
        },

        //Trigger for login, logup, invite, reset, newpass, confirm views.
        start: function (content, token) {
            console.log('I am in route:', content);
            var self = this;
            var viewUrl;
            viewUrl = 'views/models/' + content;
            require([viewUrl], function (View) {
                if (self.view) {
                    self.view.undelegateEvents();
                }
                self.view = new View();
            });
        },

        //Method for main-page route.
        main: function () {
            var modelUrl;
            var viewUrl;
            var self = this;
            if (APP.usrId) {
                modelUrl = 'models/user';
                require([modelUrl], function (Model) {
                    self.model = new Model({_id: APP.usrId});
                    self.model.content = 'api/users';
                    self.model.fetch({
                        success: function (response) {
                            viewUrl = 'views/models/main';
                            require([viewUrl], function (View) {
                                    if (self.view) {
                                        self.view.undelegateEvents();
                                    }
                                    self.view = new View({model: self.model});
                                }
                            )
                        }

                    });
                });
            }
            if (!APP.usrId) {
                viewUrl = 'views/models/main';
                modelUrl = 'models/user';
                require([viewUrl, modelUrl], function (View, Model) {
                        self.model = new Model();
                        self.model.content = 'login';
                        self.model.save(null, {
                            success: function (responce) {
                                APP.usrId = self.model.get('_id');
                                if (self.view) {
                                    self.view.undelegateEvents();
                                }
                                self.view = new View({model: self.model});
                            },
                            error: function (err) {
                                Backbone.history.navigate('myApp/start/login', {trigger: true});
                            }
                        });
                    }
                )
            }
        },

        //Method for collections routes.
        goToContent: function (content, findParameter, parameterValue) {
            var content = content;
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
        },

        //Trigger within conversation route.
        conversation: function (content, part2) {
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
        },

        //Helper within creation collections views.
        renderView: function (View) {
            if (this.view) {
                this.view.undelegateEvents();
            }
            this.view = new View({collection: this.collection});
        },

        //Trigger within logout route.
        logout: function () {
            var self = this;
            $.ajax({
                type: "POST",
                url: '/logout',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (user) {
                    delete APP.usrId;
                    Backbone.history.navigate('#myApp/start/login', {trigger: true});
                }
            });
        }
    });

    return Router;
});