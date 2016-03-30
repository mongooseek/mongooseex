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
            'click #make-post': 'post',
            'click .trash-button': 'deletePost'
        },
        deletePost: function (e) {
            e.preventDefault();
            var postId;
            postId = e.target.id;
            console.log(postId);
            var postModel = this.collection.get(postId);
            var blockToRemove = 'tr[id="' + postId + '"]';
            var $blockToRemove = $(blockToRemove);
            postModel.destroy({
                success: function (ressponce) {
                    $blockToRemove.remove();
                },
                error: function (err) {

                }
            });
        },
        render: function () {
            console.log('Clicked POSTS BUTTON');
            var self = this;
            $.ajax({
                type: "POST",
                url: '/login',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                //data: JSON.stringify({"pass": "9", "email": "9@1.1"}),
                success: function (creator) {
                    self.creator = creator;
                    APP.usrId = creator._id;
                    var $temporaryTemplate = $('.temporary-template');
                    if ($temporaryTemplate.length) {
                        $temporaryTemplate.remove();
                    }
                    self.$el.append(self.tmpl({"creator": self.creator._id, "role": self.creator.role}));
                    var posts = self.collection;
                    posts.forEach(function (postModel) {
                        var view = new PostView({model: postModel});
                    });
                }
            });
        },
        post: function () {
            var self = this;
            var postData;
            var title = $('#titles-field').val();
            var content = $('#posts-field').val();
            if (content) {
                $('#titles-field').val('');
                $('#posts-field').val('');
                postData = {
                    title: title,
                    content: content,
                    owner: self.creator._id,
                    firstName: self.creator.firstName,
                    lastName: self.creator.lastName,
                    photo: self.creator.photo,
                };
                var postModel = new PostModel(postData);
                postModel.save(null, {
                    success: function (response) {
                        self.collection.add(postModel);
                        var postView = new PostView({model: postModel});
                        console.log(postModel);
                    },
                    error: function (err) {

                    }
                })
            } else {
                alert('Please, enter your message before sending.');
            }
        }
    });

    return PostsView;
});