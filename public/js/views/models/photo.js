define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/photo',
], function (Backbone, _, $, PhotoModel) {
    console.log("I am inside photo view");
    var PhotoView = Backbone.View.extend({
        model: new PhotoModel(),
        el: "#content",
        initialize: function () {
            console.log('Photo view initialized');

        },
        events: {
            "click #edit-button": "create"
        },
        create: function () {
            var self = this;
            var phModel = this.model;
            //phModel.set({email: email, pass: pass});
            phModel.urlRoot = '/photo';
            phModel.set('photo', $('#preview').attr('src'));
            phModel.save(null, {
                success: function (response) {
                    console.log('Response', response);
                    console.log('Successfully GOT photo');
                },
                error: function (err) {
                    console.log('Failed to get photo but you are good!');
                }
            });
        },
        render: function () {
            console.log('I am inside userView render function!!!');
            var self = this;
            var uModel = this.model;
            console.log('uModel', uModel);
            console.log('self', self);
            _.forEach(_.filter(uModel.keys(), function (key) {
                return ['fullName', 'dateOfBirth', 'age', 'email', 'location'].indexOf(key) !== -1;
            }), function (cleanKey) {
                $('#user-page').append('<div>' + cleanKey + ': ' + uModel.get(cleanKey) + '</div>');
            });
            return this;
        }
    });
    return PhotoView;
});