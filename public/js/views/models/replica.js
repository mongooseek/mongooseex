//View to deal with 'chat' model.
define([
    'views/abstract/all',
    'Underscore',
    'jQuery',
    'models/replica',
    'text!templates/models/replica.html'
], function (AllView, _, $, ReplicaModel, template) {
    var ReplicaView = AllView.extend({
        el: '#message-item',
        tmpl: _.template(template),
        render: function () {
            var part;
            var self = this;
            self.$el.prepend(self.tmpl(self.model.toJSON()));
        }
    });

    return ReplicaView;
})
;