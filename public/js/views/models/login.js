//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/login.html',
], function (Backbone, _, $, loginTemplate) {
    console.log("I am inside login view");
    var LoginView = Backbone.View.extend({
        el: '#vrakashy',
        tmpl: _.template(loginTemplate),
        initialize: function () {
            console.log(this);
            console.log('LoginView init');
            this.render();
        },
        events: {
            'click #login-button': 'login'
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
        },
        render: function () {
            var $temporaryTemplate;
            $temporaryTemplate = $('.temporary-template');
            if($temporaryTemplate.length){
                $temporaryTemplate.remove();
            }
            this.$el.append(loginTemplate);
        }
    });
    return LoginView;
});