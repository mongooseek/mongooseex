//View to deal with 'chat' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'models/replica',
    //'text!templates/models/replica.html',
    'Moment',
], function (Backbone, _, $, ReplicaModel/*, replicaTemplate*/) {
    console.log("I am inside replica view");
    var ReplicaView = Backbone.View.extend({
        el: '#replica-area',
        //tmpl: _.template(replicaTemplate),
        initialize: function () {
            console.log('Replica view initialized!');
            this.render();
        },
        events: {},
        render: function () {
            /*var self = this;
            var chatModel = this.model;
            if (chatModel.get('_id')) {
                self.$el.prepend(self.tmpl(chatModel.toJSON()));
            } else {
                chatModel.save(null, {
                    success: function (response) {
                        console.log('Successfully GOT resp with _id: ' + response.toJSON()._id);
                        self.emmitMessage(chatModel);
                    },
                    error: function (err) {
                        console.log('Failed to save chat');
                    }
                });
            }*/
        },
        emmitMessage: function (message) {
            /*var self = this;
            var mess = message;
            APP.io.emit('custom_event', mess, function (data) {
                self.appendToChat(mess);
            });*/
        },
        appendToChat: function (message) {
            /*var mess = message;
            var self = this;
            self.$el.prepend(self.tmpl(mess.toJSON()));*/
        }
    });
    return ReplicaView;
})
;