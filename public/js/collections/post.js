//Collection to deal with posts.
define([
    'collections/base',
    'models/post'
], function (BaseCollection, PostModel) {

    var PostsCollection = BaseCollection.extend({
        content: "api\/posts",
        model: PostModel
    });

    return PostsCollection;
});