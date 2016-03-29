define([
    'Backbone'
], function (Backbone) {

    var AllCollectionsView = Backbone.View.extend({
        el: "#vrakashy",
        initialize: function () {
            console.log('View for collections initialized!');
            this.render();
        }
    });
    return AllCollectionsView;
});