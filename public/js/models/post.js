define([
    'models/base',
], function (BaseModel) {
    console.log('I am inside POST MODEL!');
    var PostModel = BaseModel.extend({
        urlRoot: function () {
            return '/posts/';
        }
    });
    return PostModel;
});