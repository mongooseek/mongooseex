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
        /*APP.io.emit('custom_event', {_id: '56eadde6f8ab6c3c15a9e25a', text: 'This is my text!!!'}, function(cd){
            console.log(cd);
        })*/
        /*APP.io.on('custom_response', function (data) {
            alert(data.text);
        });*/
        //APP.io = socketio.disconnect();
        Backbone.history.start({silent: false});
    }

    return {
        init: init
    };
});