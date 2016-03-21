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
        //el: '#textarea',
        tmpl: _.template(replicaTemplate),
        initialize: function () {
            console.log('Replica view initialized!');
            this.render();
        },
        events: {},
        render: function () {
            var part;
            var self = this;
            var type = '[type="' + self.model.get('part2') + '"]';
            console.log(self.model.get('text'));
            part = (self.model.get('status')=='sender')?'me':'2part';
            $textarea = $('textarea' + type);
            $textarea.append(part + ': ' + self.model.get('text') + '\n\n');
        },
        emmitMessage: function (message) {
        },
        appendToChat: function (message) {
        }
    });
    return ReplicaView;
})
;