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
    'router',
    'socketio'
], function (PhotoModel, PhotoView, UserView, PostView, PostsView, Router, socketio) {

    function init() {
        console.log('App init!');
        var router = new Router();
        var io = socketio.connect();

        io.on('custom_response', function (data) {
            console.log(data);
        });
        io.emit('custom_event', {
            a: 200, c: 300
        });

        Backbone.history.start({silent: true});

    }

    return {
        init: init
    };
});