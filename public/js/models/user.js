//Constructor to create user's model.
define([
    'models/base',
    'Moment'
], function (BaseModel, moment) {
    var UserModel = BaseModel.extend({
        defaults: {
            firstName: '',
            lastName: '',
            role: 'user',
            city: '',
            photo: 'http://www.jordanhardware.com/styles/default/xenforo/avatars/avatar_m.png'
        },
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