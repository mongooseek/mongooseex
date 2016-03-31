//Constructor to create chat's model.
define([
    'models/base',
    'Moment'
], function (BaseModel, moment) {

    var ReplicaModel = BaseModel.extend({
        defaults: {
            read: false
        },

        //Helps to create additional fields to set in the html template.
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