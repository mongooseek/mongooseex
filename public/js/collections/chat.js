//TODO - remove or change the collection.
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