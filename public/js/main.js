//Module to upload UI dependencies.
var APP = APP || {};

require.config({
    paths: {
        Underscore: 'libs/underscore/underscore',
        jQuery: 'libs/jquery/dist/jquery',
        //Bootstrap: 'libs/bootstrap/dist/css/bootstrap',
        Backbone: 'libs/backbone/backbone',
        Moment: 'libs/moment/moment',
        text: 'libs/text/text',
        socketio: '/socket.io/socket.io',
        views: 'views',
        models: 'models',
        collections: 'collections',
        templates: '../templates'
    },
    shim: {
        Underscore: {
            exports: '_'
        },
        jQuery: {
            exports: '$'
        },
        'Backbone': ['Underscore', 'jQuery'],
        'app': ['Backbone']
    }
});

require(['app'], function (app) {
    app.init();
});
