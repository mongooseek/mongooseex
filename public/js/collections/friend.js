//Collection to deal with friends.
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