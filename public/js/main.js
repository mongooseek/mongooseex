var APP = APP || {};

require.config({
    paths: {
        Underscore: 'libs/underscore/underscore',
        jQuery: 'libs/jquery/dist/jquery',
        //Bootstrap: 'libs/bootstrap/dist/css/bootstrap',
        Backbone: 'libs/backbone/backbone',
        text: 'libs/text/text',
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
