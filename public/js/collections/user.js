define([
    'collections/base',
    'models/user'
], function (BaseCollection, UserModel) {

    var UsersCollection = BaseCollection.extend({
        content: "api\/users",
        model: UserModel
    });
    return UsersCollection;
});