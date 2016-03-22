//Collection to deal with users.
define([
    'collections/base',
    'models/friend'
], function (BaseCollection, FriendModel) {

    var FriendsCollection = BaseCollection.extend({
        content: "api\/friends",
        model: FriendModel
    });
    return FriendsCollection;
});