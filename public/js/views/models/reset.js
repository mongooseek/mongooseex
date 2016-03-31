//View to deal with 'main user' model to reset a password.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/abstract/models/start',
    'text!templates/models/reset.html',
], function (Backbone, _, $, StartView, template) {

    var ResetView = StartView.extend({

        tmpl: _.template(template),

        mainMethod: function () {
            var $emailField = $('#reset-email');;
            var email = $emailField.val();;
            $.ajax({
                type: "POST",
                url: '/reset',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"email": email}),
                success: function (val) {
                    alert('Reset message was sent to your e-mail.');
                }
            })

        }
    });

    return ResetView;
});