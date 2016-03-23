define([
    'Backbone'
], function (Backbone) {

    var CollectionsView = Backbone.View.extend({
        initialize: function () {
            console.log('View for collections initialized!');
            this.render();
        }
    });
    return CollectionsView;
});