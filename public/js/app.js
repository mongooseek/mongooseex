//Application.
define([
    'router',
    'socketio'
], function (Router, socketio) {

    function init() {
        console.log('App init!');
        var router = new Router();
        APP.io = socketio.connect();
        console.log(APP.io);
        //APP.io = socketio.disconnect();
        //APP.io.on('custom_response', function (data) {alert(data);});
        Backbone.history.start({silent: true});
    }

    return {
        init: init
    };
});