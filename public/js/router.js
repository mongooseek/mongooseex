define([
    'Backbone',
    'models/userModel',
    'views/userView',
    'models/postModel',
    'views/postView',
    'collections/postsCollection',
    'views/postsView'
], function (Backbone, UserModel, UserView, PostModel, PostView, PostsCollection, PostsView) {
    var Router = Backbone.Router.extend({
        routes: {
            "application/login": "login",
            "application/start": "start"
        },
        initialize: function () {
            console.log("Router init");
            console.log('This1 inside the router', this.routes);
            Backbone.history.start();
            Backbone.history.navigate('#application/login', {trigger: true});
        },
        login: function () {
            console.log('This1 inside the router', this.routes);
            var userModel = new UserModel();
            var userView = new UserView({model: userModel});
            userView.func = userView.model.get('firstName');
            setTimeout(userView.func, 15000);
            //Backbone.history.navigate('#application/start', {trigger: true});
        },
        start: function () {
            var postView = new PostView();
            var postsView = new PostsView();
        }
    });

    return Router;
});