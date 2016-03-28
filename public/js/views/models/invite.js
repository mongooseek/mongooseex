//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/models/start',
    'text!templates/models/invite.html',
], function (Backbone, _, $, StartView, template) {
    var InviteView = StartView.extend({
        tmpl: _.template(template),
        mainMethod: function () {
            console.log('INVITE VIEW IS WORKING');
        }
    });
    return InviteView;
});