define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/photoModel',
], function (Backbone, _, $, PhotoModel) {
    console.log("I am inside photo view");
    var PhotoView = Backbone.View.extend({
        model: new PhotoModel(),
        el: '#in-sub',
        initialize: function () {
            console.log('Photo view initialized');
            var self = this;
            var phModel = this.model;
            //phModel.set({email: email, pass: pass});
            phModel.urlRoot = '/photo';
            phModel.fetch({
                success: function (response) {
                    console.log('Response', response);
                    console.log('Successfully GOT photo');
                    /*$('#input-first-name').val('');
                     $('#input-last-name').val('');
                     $('#input-email').val('');
                     $('#input-password').val('');
                     $('#input-confirm-password').val('');*/
                },
                error: function (err) {
                    console.log('Failed to get photo!');
                }
            });
        },
        events: {
            //'click': 'login'
        },
        login: function () {
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