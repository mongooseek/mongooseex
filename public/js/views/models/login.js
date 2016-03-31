//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/models/start',
    'text!templates/models/login.html',
], function (Backbone, _, $, StartView, template) {
    var LoginView = StartView.extend({
        content: 'login',
        tmpl: _.template(template),
        mainMethod: function () {
            var modelUrl;
            var viewUrl;
            var $emailField;
            var $passField;
            var email;
            var pass;
            var credentials;
            var self = this;
            $emailField = $('#input-email');
            $passField = $('#input-pass');
            email = $emailField.val();
            pass = $passField.val();
            if (email && pass) {
                credentials =
                {
                    email: email,
                    pass: pass
                };
                viewUrl = 'views/models/main';
                modelUrl = 'models/user';
                require([viewUrl, modelUrl], function (View, Model) {
                    if (self.View) {
                        self.View.undelegateEvents();
                    }
                    self.model = new Model(credentials);
                    self.model.content = 'login';
                    self.model.save(null,
                        {
                            success: function (response) {
                                self.model.content = 'api/users';
                                APP.usrId = self.model.get('_id');
                                self.view = new View({model: self.model});
                                Backbone.history.navigate('myApp/start/main', {replace: true});
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        });
                });
            } else {
                alert('Please, input you e-mail and password to login.');
            }
        }
    });
    return LoginView;
});