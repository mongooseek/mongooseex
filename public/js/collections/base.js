define(['Backbone'], function (Backbone) {
    var BaseCollection = Backbone.Collection.extend({
        url: function () {
            return '/' + this.content + '/'
        }
    });

    return BaseCollection;
});