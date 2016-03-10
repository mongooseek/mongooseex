define(['Backbone', 'Underscore', 'jQuery'], function (Backbone, _, $) {
    console.log('I am inside photo model!');
    var PhotoModel = Backbone.Model.extend({
        idAttribute: '_id'
    });
    return PhotoModel;
});