define([
    //'router',
    'models/photo',
    'views/models/photo',
    //'models/userModel',
    'views/models/user',
    //'models/postModel',
    'views/models/post',
    //'collections/postsCollection',
    'views/collections/post',
    'router'
], function (PhotoModel, PhotoView, UserView, PostView, PostsView, Router) {

    function init() {
        console.log('App init!');
        var router = new Router();
        Backbone.history.start({silent: true});

    }

    return {
        init: init
    };
});