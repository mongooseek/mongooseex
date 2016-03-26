//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/models/logup.html',
], function (Backbone, _, $, template) {
    console.log("I am inside login view");
    var LogupView = Backbone.View.extend({
        el: '#vrakashy',
        tmpl: _.template(template),
        initialize: function () {
            console.log(this);
            console.log('LogupView init');
            this.render();
        },
        events: {
            'click #login-button': 'logup'
        },
        render: function () {
            var self = this;
            var $temporaryTemplate;
            $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.length) {
                $temporaryTemplate.remove();
            }
            self.$el.append(self.tmpl);
        },
        login: function () {
            var modelUrl;
            var viewUrl;
            var $emailField;
            var $passField;
            var $temporaryTemplate;
            var email;
            var pass;
            var credentials;
            var self = this;
            $temporaryTemplate = $('.temporary-template');
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
                    self.model.urlRoot = '/login'
                    self.model.save(null,
                        {
                            success: function (response) {
                                APP.usrId = self.model.get('_id');
                                self.view = new View({model: self.model});
                                Backbone.history.navigate('myApp/main', {replace: true});
                                $temporaryTemplate.remove();

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
    return LogupView;
});