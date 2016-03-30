//Constructor to create post's model.
define([
    'models/base',
], function (BaseModel) {
    console.log('I am inside POST MODEL!');
    var PostModel = BaseModel.extend({
        urlRoot: function () {
            return '/api/posts/';
        },
        parse: function (response) {
            if (response.firstName && response.lastName) response.fullName = response.firstName + ' ' + response.lastName;
            return response;
        }
    });

    return PostModel;
});