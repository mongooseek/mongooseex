//Abstract model's constructor. It will be extended by concrete models.
define(['Backbone', 'Underscore', 'jQuery'], function (Backbone, _, $) {

    var BaseModel = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: function () {
            return '/' + this.content
        }
    });

    return BaseModel;
});