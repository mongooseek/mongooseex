//Collection to deal with replicas within conversation.
define([
    'collections/base',
    'models/replica'
], function (BaseCollection, ReplicaModel) {

    var ReplicasCollection = BaseCollection.extend({
        model: ReplicaModel
    });

    return ReplicasCollection;
});