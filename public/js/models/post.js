//Constructor to create post's model.
define([
    'models/base',
], function (BaseModel) {

    var PostModel = BaseModel.extend({

        urlRoot: function () {
            return '/api/posts/';
        },

        //Helps to create additional fields of model to set in the html template.
        parse: function (response) {
            if (response.firstName && response.lastName) response.fullName = response.firstName + ' ' + response.lastName;
            return response;
        }
    });

    return PostModel;
});