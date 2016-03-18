//Collection to deal with chat's messages.
define([
    'collections/base',
    'models/replica'
], function (BaseCollection, ReplicaModel) {

    var ReplicasCollection = BaseCollection.extend({
        content: "api\/replicas",
        model: ReplicaModel
    });
    return ReplicasCollection;
});