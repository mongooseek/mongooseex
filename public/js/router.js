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
            'myApp/start/(:content)': 'start',
            'myApp/logout': 'logout',
            'myApp(/:content)': 'goToContent',
            'myApp/:content/conversation/:part2': 'conversation',
            'myApp/:content/:findParameter/:parameterValue': 'goToContent',
            '*any': 'default'
        },
        default: function () {
            console.log('DEFAULT');
            Backbone.history.navigate('#myApp/main', {trigger: true});
        },
        start: function (content) {
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
        main: function () {
            var modelUrl;
            var viewUrl;
            var self = this;
            if (APP.usrId) {
                modelUrl = 'models/user';
                require([modelUrl], function (Model) {
                    self.model = new Model({_id: APP.usrId});
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
                modelUrl = 'models/user';
                require([modelUrl], function (Model) {
                    $.ajax({
                        type: "POST",
                        url: '/login',
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        //data: JSON.stringify({"pass": "undefined", "email": "undefined"}),
                        success: function (val) {
                            if (val.login == "login") {
                                Backbone.history.navigate('myApp/start/login', {trigger: true});
                            } else {
                                self.model = new Model(val);
                                viewUrl = 'views/models/main';
                                require([viewUrl], function (View) {
                                        if (self.view) {
                                            self.view.undelegateEvents();
                                        }
                                        self.view = new View({model: self.model});
                                    }
                                )
                            }
                        }
                    })
                });
            }
        },
        goToContent: function (content, findParameter, parameterValue) {
            var content = content;
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