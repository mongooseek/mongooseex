//Constructor represents backbone user's model representation.
define([
    'models/base',
    'Moment'
], function (BaseModel, moment) {

    var UserModel = BaseModel.extend({

        //To set default fields of user model.
        defaults: {
            firstName: '',
            lastName: '',
            role: 'user',
            city: '',
            photo: 'http://www.jordanhardware.com/styles/default/xenforo/avatars/avatar_m.png'
        },

        //Helps to set additional fields to set in the html template.
        parse: function (response) {
            if (response.dateOfBirth) {
                response.birth = moment(response.dateOfBirth).format("MMM Do, YYYY");
                response.birthInSlashFormat = moment(response.dateOfBirth).format("L");
            }
            if (response.firstName && response.lastName) response.fullName = response.firstName + ' ' + response.lastName;
            return response;
        }
    });

    return UserModel;
});