//Abstract collection. It will be extended by concrete collections.
define(['Backbone'], function (Backbone) {
    var BaseCollection = Backbone.Collection.extend({
        url: function () {
            return '/' + this.content + '/'
        }
    });

    return BaseCollection;
});