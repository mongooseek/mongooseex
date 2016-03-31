//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/models/start',
    'text!templates/models/confirm.html',
], function (Backbone, _, $, StartView, template) {
    var ConfirmView = StartView.extend({
        content: 'confirm',
        tmpl: _.template(template),
        mainMethod: function () {
            var self = this;
            var viewUrl;
            var modelUrl;
            var currentPath;
            var $formsFields;
            var field;
            var credentials = {};
            $formsFields = $('.form-control');
            $formsFields.each(function () {
                field = $(this).attr('id');
                credentials[field] = $(this).val();
                $(this).val('');
            });
            currentPath = Backbone.history.getFragment();
            credentials.confirmToken = currentPath.substr(-20, 20);
            if (credentials.email && credentials.pass) {
                viewUrl = 'views/models/main';
                modelUrl = 'models/user';
                require([viewUrl, modelUrl], function (View, Model) {
                        self.model = new Model(credentials);
                        self.model.content = 'confirm';
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
                )
            } else {
                console.log('Input correct data');
            }
        }
    });
    return ConfirmView;
});