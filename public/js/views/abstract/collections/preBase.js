define([
    'Backbone'
], function (Backbone) {

    var AllCollectionsView = Backbone.View.extend({
        initialize: function () {
            console.log('View for collections initialized!');
            this.render();
        }
    });
    return AllCollectionsView;
});