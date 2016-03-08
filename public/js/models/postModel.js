define(['Backbone', 'Underscore', 'jQuery'], function (Backbone, _, $) {
    console.log('I am inside post model!');
    var PostModel = Backbone.Model.extend({});
    idAttribute: '_id'
    return PostModel;
});