define([
    'collections/baseCollection',
], function (BaseCollection) {

    var PostsCollection = BaseCollection.extend({
        content: "api\/posts"
    });
    return PostsCollection;
});