//Constructor to create chat's model.
define([
    'models/base',
], function (BaseModel) {
    console.log('I am inside REPLICA MODEL!');
    var ReplicaModel = BaseModel.extend({
        /*urlRoot: function () {
            return '/api/replicas/';
        }*/
    });
    return ReplicaModel;
});