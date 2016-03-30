//View to deal with 'chat' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/replica',
    'text!templates/models/replica.html',
    'Moment',
], function (Backbone, _, $, ReplicaModel, template, moment) {
    console.log("I am inside replica view");
    var ReplicaView = Backbone.View.extend({
        el: '#message-item',
        tmpl: _.template(template),
        initialize: function () {
            console.log('Replica view initialized!');
            this.render();
        },
        events: {},
        render: function () {
            var part;
            var self = this;
            self.$el.prepend(self.tmpl(self.model.toJSON()));
        }
    });
    return ReplicaView;
})
;