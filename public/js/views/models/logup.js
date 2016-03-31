//View to deal with 'main user' model within logup.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/abstract/models/start',
    'text!templates/models/logup.html',
], function (Backbone, _, $, StartView, template) {

    var LogupView = StartView.extend({

        tmpl: _.template(template),

        //Method trigger when logup is clicked.
        mainMethod: function () {
            var registrationData = {};
            var city = {};
            var self = this;
            var $formsFields = $('.form-control');
            var viewUrl;
            var modelUrl;
            var field;
            $formsFields.each(function () {
                field = $(this).attr('id');
                if ($(this).val()) registrationData[field] = $(this).val();
                $(this).val('');
            });
            if (registrationData.email && registrationData.pass && registrationData.pass == registrationData.confirm) {
                viewUrl = 'views/models/main';
                modelUrl = 'models/user';
                require([viewUrl, modelUrl], function (View, Model) {
                        $.ajax({
                            type: "GET",
                            url: 'http://maps.google.com/maps/api/geocode/json?address=' + registrationData["city"] + '?sensor=false',
                            data: {},
                            success: function (val) {
                                city.name = val.results[0].address_components[0].long_name;
                                city.lat = val.results[0].geometry.location.lat;
                                city.lng = val.results[0].geometry.location.lng;
                                registrationData["city"] = city.name;
                                registrationData["location"] = [city.lng, city.lat];
                                self.model = new Model(registrationData);
                                self.model.content = 'logup';
                                console.log(self.model);
                                self.model.save(null, {
                                    success: function (responce) {
                                        if (self.view) {
                                            self.view.undelegateEvents();
                                        }
                                        self.view = new View({model: self.model});
                                        Backbone.history.navigate('myApp/main', {replace: true});
                                    },
                                    error: function (err) {
                                        console.log(err);
                                    }
                                });
                            }
                        });
                    }
                )
            } else {
                console.log('Input correct data');
            }
        }
    });

    return LogupView;
});