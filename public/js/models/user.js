define([
    'models/base'
], function (BaseModel) {

    console.log("I am inside USER MODEL");
    var UserModel = BaseModel.extend({
        urlRoot: function () {
            return '/users/';
        },
        defaults: {
            fullName: '',
            dateOfBirth: '',
            age: '',
            location: '',
            email: '',
            role: 'user'
        },
        initialize: function () {
            console.log('Model initialized');
        },
        parse: function (response) {
            if (!response.dateOfBirths) {
                response.dateOfBirth = new Date();
                response.age = (new Date() - new Date(response.dateOfBirth)) / (1000 * 60 * 60 * 24 * 365);
                if (response.age < 1) response.age = ':)';
            }
            if (response.firstName && response.lastName) response.fullName = response.firstName + ' ' + response.lastName;
            return response;
        }
    });
    return UserModel;
});