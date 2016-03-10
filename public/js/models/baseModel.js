define(['Backbone', 'Underscore', 'jQuery'], function (Backbone, _, $) {
    console.log('I am inside BASE MODEL');
    var BaseModel = Backbone.Model.extend({
        idAttribute: '_id'
    });
    return BaseModel;
});