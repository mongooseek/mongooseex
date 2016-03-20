//View to deal with 'chat' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/replica',
    'text!templates/models/replica.html',
    'Moment',
], function (Backbone, _, $, ReplicaModel, replicaTemplate, moment) {
    console.log("I am inside replica view");
    var ReplicaView = Backbone.View.extend({
        el: '#replica-area',
        tmpl: _.template(replicaTemplate),
        initialize: function () {
            console.log('Replica view initialized!');
            this.render();
        },
        events: {},
        render: function () {
            var self = this;
            var type = '[type="' + self.model.get('part2') + '"]';
            console.log(type);
            self.el = '#replica-area' + type;
            self.$el.prepend(self.tmpl(self.model.toJSON()));
        },
        emmitMessage: function (message) {
        },
        appendToChat: function (message) {
        }
    });
    return ReplicaView;
})
;