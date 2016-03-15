//Collection to deal with chat's messages.
define([
    'collections/base',
    'models/chat'
], function (BaseCollection, ChatModel) {

    var ChatsCollection = BaseCollection.extend({
        content: "api\/chats",
        model: ChatModel
    });
    return ChatsCollection;
});