//TODO - remove or refactor.
define([
    'views/abstract/all',
    'Underscore',
    'jQuery',
    'text!templates/models/negotiator.html'
], function (AllView, _, $, negotiatorTemplate) {
    console.log("I am inside user view");
    var NegotiatorView = AllView.extend({
        el: '.negotiator-item',
        tmpl: _.template(negotiatorTemplate),
        render: function () {
            console.log('I am in negotiator render function!!!');
            var self = this;
            if (self.$el.length) {
                self.$el.append(self.tmpl(self.model.toJSON()));
            }
        }
    });
    return NegotiatorView;
});