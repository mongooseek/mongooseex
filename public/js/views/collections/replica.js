//View to deal with 'replicas' collection.
define([
    'Backbone',
    'jQuery',
    'collections/replica',
    'models/replica',
    'views/models/replica',
    'text!templates/collections/replica.html',
    'Moment',
    'socketio'
], function (Backbone, $, ReplicasCollection, ReplicaModel, ReplicaView, replicasTemplate, moment, socketio) {

    var ReplicasView = Backbone.View.extend({
        //el: "#conversation",
        tmpl: _.template(replicasTemplate),
        initialize: function () {
            console.log("REPLICAS VIEW was INITIALIZED");
            this.render();
        },
        events: {
            'click #send-mssg': 'sendMessage',
        },
        render: function () {
            var replicas;
            var self = this;
            var type = '[type="' + (self.collection.content.match(/\d+\w*/i))[0] + '"]';
            self.el = "#conversation" + type;
            self.$el.append(self.tmpl);
            replicas = this.collection;
            replicas.forEach(function (replica) {
                var replicaView = new ReplicaView({model: replica});
                return this;
            });
        },
        sendMessage: function (e) {

        },
        renderOne: function (model) {

        }
    });

    return ReplicasView;
});