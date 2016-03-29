//Constructor to create chat's model.
define([
    'models/base',
    'Moment'
], function (BaseModel, moment) {
    console.log('I am inside REPLICA MODEL!');
    var ReplicaModel = BaseModel.extend({
        parse: function (response) {
            if (response.sender) response.fullName = response.sender.firstName + ' ' + response.sender.lastName;
            if (response.date) {
                response.created = moment(response.date).format("MMM Do, YY, h:mm:ss a");
            }
            return response;
        }
    });
    return ReplicaModel;
});