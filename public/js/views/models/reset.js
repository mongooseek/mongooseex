//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/models/start',
    'text!templates/models/reset.html',
], function (Backbone, _, $, StartView, template) {
    console.log("I am inside reset view");
    var ResetView = StartView.extend({
        tmpl: _.template(template),
        mainMethod: function () {
            console.log('RESET WAS CLICKED');
            var $emailField;
            var email;
            var self = this;
            $emailField = $('#reset-email');
            email = $emailField.val();
            $.ajax({
                type: "POST",
                url: '/reset',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"email": email}),
                success: function (val) {
                    console.log(val);
                }
            })

        }
    });
    return ResetView;
});