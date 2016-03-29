//View to deal with 'post' collection.
define([
    'Backbone',
    'jQuery',
    'views/abstract/collections/preBase',
    'collections/post',
    'models/post',
    'views/models/post',
    'text!templates/collections/post.html'
], function (Backbone, $, AllCollectionsView, PostsCollection, PostModel, PostView, postsTemplate) {

    var PostsView = AllCollectionsView.extend({

        tmpl: _.template(postsTemplate),

        //<--" initialize: "--> removed to BaseCollectionsView.
        events: {
            'click #make-post': 'post'
        },
        render: function () {
            console.log('Clicked POSTS BUTTON');
            var self = this;
            var $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.length) {
                $temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl);
            var posts = this.collection;
            posts.forEach(function (postModel) {
                var view = new PostView({model: postModel});
            });
        },
        post: function () {
            var postData;
            var content = $('#posts-field').val();
            if (content) {
                $('#posts-field').val('');
                $.ajax({
                    type: "POST",
                    url: '/login',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    //data: JSON.stringify({"pass": "9", "email": "9@1.1"}),
                    success: function (creator) {
                        console.log('CREATOR', creator);
                        postData = {
                            content: content,
                            owner: creator._id,
                            firstName: creator.firstName,
                            lastName: creator.lastName,
                            photo: creator.photo,
                        };
                        var postModel = new PostModel(postData);
                        postModel.save(null, {
                            success: function (response) {
                                var postView = new PostView({model: postModel});
                                console.log(postModel);
                            },
                            error: function (err) {

                            }
                        })
                    }
                })
            } else {
                alert('Please, enter your message before sending.');
            }
        }
    });

    return PostsView;
});