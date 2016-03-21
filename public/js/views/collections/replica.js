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
        el: ".conversation",
        tmpl: _.template(replicasTemplate),
        initialize: function () {
            console.log("REPLICAS VIEW was INITIALIZED");
            this.render();
        },
        events: {
            'click .send-message': 'sendMessage'
        },
        sendMessage: function (e) {
            e.preventDefault();
            var id = e.target.type;
            var type = '[type="' + id + '"]';
            var $messageField = $('.message-field' + type);
            var message = $messageField.val();
            var replicaModel1 = new ReplicaModel();
            var replicaModel2 = new ReplicaModel();
            var date = moment();
            replicaModel1.set({part1: APP.usrId, part2: id, status: "sender", text: message, date: date});
            replicaModel2.set({part1: id, part2: APP.usrId, status: "receiver", text: message, date: date});
            replicaModel1.urlRoot = '/api/replicas/' + id + '/';
            replicaModel2.urlRoot = '/api/replicas/' + APP.usrId + '/';
            replicaModel1.save();
            replicaModel2.save();
            $messageField.val('');
        },
        renderOne: function (e) {

        },
        render: function () {
            var self = this;
            $('.template-for-replicas').hide();
            var _id = (this.collection.content.match(/\d+\w*/i))[0];
            var type = '[type="' + _id + '"]';
            $('.template-for-replicas' + type).show();
            var replicas;
            replicas = this.collection;
            var $textArea = $('textarea' + type);
            var textAreaVal = $textArea.val();
            if (textAreaVal) {
                $textArea.empty();
            }
            replicas.forEach(function (replica) {
                console.log(replica);
                var replicaView = new ReplicaView({model: replica});
                return this;
            });
        },
        renderOne: function (model) {

        }
    });

    return ReplicasView;
});