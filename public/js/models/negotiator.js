//TODO - remove or refactor.
define([
    'models/base',
    'Moment'
], function (BaseModel, moment) {

    var NegotiatorModel = BaseModel.extend({

        urlRoot: function () {
            return '/api/negotiators/';
        },

        defaults: {
            fullName: '',
            dateOfBirth: moment(),
            age: '',
            email: '',
            role: 'user',
            friends: [],
            city: {},
            photo: 'http://www.jordanhardware.com/styles/default/xenforo/avatars/avatar_m.png'
        },

        parse: function (response) {
            if (response.dateOfBirth) {
                var year = moment().year();
                var age = (new Date() - new Date(response.dateOfBirth)) / (1000 * 60 * 60 * 24 * ((year % 4 == 0) ? 366 : 365));
                age = (age < 1) ? ':)' : age;
                var dateOfBirth = response.dateOfBirth;
                dateOfBirth = moment(dateOfBirth).format("MMM Do, YYYY");
                response.age = age;
                response.dateOfBirth = dateOfBirth;
            }
            if (response.firstName && response.lastName) response.fullName = response.firstName + ' ' + response.lastName;
            return response;
        }
    });

    return NegotiatorModel;
});