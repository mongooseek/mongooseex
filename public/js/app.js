//Application.
define([
    'router',
    'socketio'
], function (Router, socketio) {

    //Method to init web application.
    function init() {
        console.log('App init!');
        var router = new Router();
        APP.io = socketio.connect();
        Backbone.history.start({silent: false});
    }

    return {
        init: init
    };
});