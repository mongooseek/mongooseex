//View to deal with 'main user' model within inputting new pass after reset.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/abstract/models/start',
    'text!templates/models/newpass.html',
], function (Backbone, _, $, StartView, template) {

    var NewPassView = StartView.extend({

        tmpl: _.template(template),

        mainMethod: function () {
            var self = this;
            var viewUrl;
            var modelUrl;
            var $newPasswordField;
            var $newPasswordConfirmField;
            var newPassword;
            var newPasswordConfirm;
            var currentPath;
            var resetToken;
            var resetData;
            $newPasswordField = $('#input-password');
            $newPasswordConfirmField = $('#confirm-password');
            newPassword = $newPasswordField.val();
            newPasswordConfirm = $newPasswordConfirmField.val();
            if (newPassword && newPassword === newPasswordConfirm) {
                currentPath = Backbone.history.getFragment();
                resetToken = currentPath.substr(-20, 20);
                resetData = {
                    resetToken: resetToken,
                    pass: newPassword
                };
                viewUrl = 'views/models/main';
                modelUrl = 'models/user';
                require([viewUrl, modelUrl], function (View, Model) {
                        self.model = new Model(resetData);
                        self.model.content = 'newpass';
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
                console.log('Please, input correct data');
            }
        }
    });
    
    return NewPassView;
});