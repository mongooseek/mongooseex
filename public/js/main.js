require.config({
    paths: {
        Backbone: 'libs/backbone/backbone',
        Underscore: 'libs/underscore/underscore',
        jQuery: 'libs/jquery/dist/jquery',
        //text: 'libs/text/text',
        Mongoscripts: 'mongoscripts',
        //collections: 'collections',
        views: 'views',
        models: 'models',
        //templates: '../templates'
    },
    shim: {
        Underscore: {
            exports: '_'
        },
        jQuery: {
            exports: '$'
        },
        /*Mongoscripts: {
         exports: 'mons'
         },*/
        Backbone: ['Underscore', 'jQuery'],
        app: ['Backbone']
    }
});

require(['app'], function (app) {
    app.init();
});
