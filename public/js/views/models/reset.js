//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/models/reset.html',
], function (Backbone, _, $, forgotTemplate) {
    console.log("I am inside forgot view");
    var ResetView = Backbone.View.extend({
        el: '#vrakashy',
        tmpl: _.template(forgotTemplate),
        initialize: function () {
            console.log('ForgotView init');
            this.render();
        },
        events: {

        },
        render: function () {
            var $temporaryTemplate;
            $temporaryTemplate = $('.temporary-template');
            if($temporaryTemplate.length){
                $temporaryTemplate.remove();
            }
            this.$el.append(forgotTemplate);
        },
        resetPass: function () {
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
    return ResetView;
});