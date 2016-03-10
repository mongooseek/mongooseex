define([
    //'router',
    'models/photoModel',
    'views/photoView',
    'models/userModel',
    'views/userView',
    'models/postModel',
    'views/postView',
    'collections/postsCollection',
    'views/postsView',
], function (PhotoModel, PhotoView) {

    //var APP = {};
    //var router = new Router();
    //var userView = new UserView();
    //var postView = new PostView();
    var photoView = new PhotoView();

    function init() {
        console.log('App init!');
    }

    return {
        init: init
    };
});