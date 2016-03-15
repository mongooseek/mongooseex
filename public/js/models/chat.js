define([
    'models/base',
], function (BaseModel) {
    console.log('I am inside CHAT MODEL!');
    var ChatModel = BaseModel.extend({
        urlRoot: function () {
            return '/api/chats/';
        }
    });
    return ChatModel;
});