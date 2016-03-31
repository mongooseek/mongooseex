//View to deal with 'main user' model within login.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/abstract/models/start',
    'text!templates/models/login.html',
], function (Backbone, _, $, StartView, template) {

    var LoginView = StartView.extend({

        content: 'login',

        tmpl: _.template(template),

        //Trigger when login button is clicked.
        mainMethod: function () {
            var self = this;
            var $emailField = $('#input-email');
            var $passField = $('#input-pass');
            var email = $emailField.val();
            var pass = $passField.val();
            var modelUrl;
            var viewUrl;
            var credentials;
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