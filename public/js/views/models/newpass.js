//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/models/start',
    'text!templates/models/newpass.html',
], function (Backbone, _, $, StartView, template) {
    console.log("I am inside main view");
    var NewPassView = StartView.extend({
        tmpl: _.template(template),
        mainMethod: function () {
            var $newPasswordField;
            var $newPasswordConfirmField;
            var newPassword;
            var newPasswordConfirm;
            var currentPath;
            var resetToken;
            $newPasswordField = $('#input-password');
            $newPasswordConfirmField = $('#confirm-password');
            newPassword = $newPasswordField.val();
            newPasswordConfirm = $newPasswordConfirmField.val();
            if (newPassword && newPasswordConfirm && newPassword === newPasswordConfirm) {
                currentPath = Backbone.history.getFragment();
                resetToken = currentPath.substr(-20, 20);
                $.ajax({
                    type: "POST",
                    url: '/newpass',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({"resetToken": resetToken, "pass": newPassword}),
                    success: function (val) {
                        console.log(val);
                        if (val.login == "login") {
                            console.log(val);
                            Backbone.history.navigate('myApp/start/login', {trigger: true});
                        } else {
                            console.log(val);
                            /*self.model = new Model(val);
                            viewUrl = 'views/models/main';
                            require([viewUrl], function (View) {
                                    if (self.view) {
                                        self.view.undelegateEvents();
                                    }
                                    self.view = new View({model: self.model});
                                }
                            )*/
                        }
                    }
                })
            }else{
                console.log('Please, input correct data');
            }
        }
    });
    return NewPassView;
});