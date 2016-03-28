//Constructor to create user's model.
define([
    'models/base',
    'Moment'
], function (BaseModel, moment) {

    console.log("I am inside USER MODEL");
    var UserModel = BaseModel.extend({
        defaults: {
            firstName: '',
            lastName: '',
            //email: '',
            //pass: '',
            //fullName: '',
            //dateOfBirth: Date.now(),
            //age: '',
            role: 'user',
            city: '',
            photo: 'http://www.jordanhardware.com/styles/default/xenforo/avatars/avatar_m.png'
        },
        initialize: function () {
            console.log('User model initialized');
        },
        parse: function (response) {
            if (response.dateOfBirth) {
                /*var year = moment().year();
                var age = (new Date() - new Date(response.dateOfBirth)) / (1000 * 60 * 60 * 24 * ((year % 4 == 0) ? 366 : 365));
                age = (age < 1) ? ':)' : age;
                var dateOfBirth = response.dateOfBirth;
                dateOfBirth = moment(dateOfBirth).format("MMM Do, YYYY");
                response.age = age;
                response.dateOfBirth = dateOfBirth;*/
                response.birth = moment(response.dateOfBirth).format("MMM Do, YYYY");
            }
            if (response.firstName && response.lastName) response.fullName = response.firstName + ' ' + response.lastName;
            return response;
        }
    });
    return UserModel;
});