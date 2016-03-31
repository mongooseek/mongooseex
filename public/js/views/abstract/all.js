//All views extends main view.
define([
    'Backbone'
], function (Backbone) {

    var AllView = Backbone.View.extend({
        el: "#vrakashy",
        initialize: function () {
            this.render();
        }
    });

    return AllView;
});