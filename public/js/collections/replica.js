//Collection to deal with chat's messages.
define([
    'collections/base',
    'models/replica'
], function (BaseCollection, ReplicaModel) {

    var ReplicasCollection = BaseCollection.extend({
        model: ReplicaModel
    });
    return ReplicasCollection;
});