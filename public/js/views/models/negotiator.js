//View to deal with 'user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    //'models/user',
    'text!templates/models/negotiator.html',
    'Moment'
], function (Backbone, _, $, negotiatorTemplate, moment) {
    console.log("I am inside user view");
    var NegotiatorView = Backbone.View.extend({
        el: '.negotiator-item',
        tmpl: _.template(negotiatorTemplate),
        initialize: function () {
            console.log('User VIEW and User MODEL initialized!!!');
            this.render();
        },
        events: {},
        render: function () {
            console.log('I am in negotiator render function!!!');
            var self = this;
            var $templateForNegotiators = $('#template-for-negotiators');
            if ($templateForNegotiators.attr('id')) {
                self.$el.append(self.tmpl(self.model.toJSON()));
            }
        }
    });
    return NegotiatorView;
});