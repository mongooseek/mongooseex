//View to deal with 'replicas' collection.
define([
    'Backbone',
    'jQuery',
    'collections/replica',
    'models/replica',
    'views/models/replica',
    //'text!templates/collections/replica.html',
    'Moment',
    'socketio'
], function (Backbone, $, ReplicasCollection, ReplicaModel, ReplicaView, /*replicasTemplate, */moment, socketio) {

    var ReplicasView = Backbone.View.extend({
        el: "#for-all-conversations", //"#for-templates",
        //el: "#for-replicas", //"#for-templates",
        //tmpl: _.template(replicasTemplate),
        initialize: function () {
            console.log("REPLICAS VIEW was INITIALIZED");
            /*this.render();
             var self = this;
             //APP.io = socketio.connect();
             APP.io.on('custom_response', function (data) {
             self.renderOne(data);
             });*/
        },
        events: {
            'click #send-mssg': 'sendMessage',
        },
        sendMessage: function () {
            /*var replicaModel = new ReplicaModel();
            replicaModel.set({
                part1: '56e737443d6ceabc126c9af2',
                part2: '56eadde6f8ab6c3c15a9e25a',
                status: 'sender',
                text: 'hi',
                date: moment()
            });
            replicaModel.save();*/
            var replicasCollection = new ReplicasCollection();
            replicasCollection.url = '/api/replicas/56e737443d6ceabc126c9af2/';
            replicasCollection.fetch();
            console.log(replicasCollection);
        },
        renderOne: function (model) {
            /*var model = new ChatModel(model);
             var chatView =  new ChatView({model: model});*/
        },
        render: function () {
            /*console.log('Clicked CHAT BUTTON');
             var self = this;
             var $temporaryTemplate = $('.temporary-template');
             if ($temporaryTemplate.attr('id')) {
             $temporaryTemplate.remove();
             }
             this.$el.append(self.tmpl);
             var chats = this.collection;
             chats.forEach(function (chatModel) {
             var view = new ChatView({model: chatModel});
             });
             return this;*/
        }
    });

    return ReplicasView;
});