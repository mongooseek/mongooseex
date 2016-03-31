//TODO - remove or refactor.
define([
    'models/base',
], function (BaseModel) {

    var ChatModel = BaseModel.extend({
        urlRoot: function () {
            return '/api/chats/';
        }
    });

    return ChatModel;
});