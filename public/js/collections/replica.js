//Collection to deal with chat's messages.
define([
    'Backbone',
    'collections/base',
    'models/replica'
], function (BaseCollection, ReplicaModel) {

    var ReplicasCollection = Backbone.Collection.extend({
        //content: "api\/replicas\/:part2",
        model: ReplicaModel
    });
    return ReplicasCollection;
});