//View to deal with 'user' collection.
define([
    'Backbone',
    'jQuery',
    'Underscore',
    'views/abstract/collections/base',
    'collections/friend',
    'models/friend',
    'views/models/friend',
    'text!templates/collections/friend.html',
    'Moment'
], function (Backbone, $, _, BaseCollectionsView, FriendsCollection, FriendModel, FriendView, template, moment) {

    var FriendsView = BaseCollectionsView.extend({
        tmpl: _.template(template),
        // <--" initialize: "--> removed to BaseCollectionsView.
        events: {
            'click .remove-friend': 'nullify',
            'click #message-button': 'message'
        },
        message: function () {
            console.log('You haven\'t chosen a person for conversation!');
        },
        render: function () {
            var self = this;
            var $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.attr('id')) {
                $temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl);
            var friends = this.collection;
            friends.forEach(function (friendModel) {
                var view = new FriendView({model: friendModel});
            });
            self.messagesCounter();
            return this;
        },
        nullify: function (e) {
            e.preventDefault();
            console.log('Clicked cancel');
            var usrModelInFriendArr;
            var friendModelInUsrArr;
            var usrIndexInFriendArr;
            var friendIndexInUsrArr;
            var friendId;
            var usrId;
            var friendModel;
            var usrModel;
            var usrFriends;
            var friendFriends;
            var $addToFriends;
            var $refuseProposition;
            var $cancelProposition;
            var $confirmProposition;
            var $removeFriend;
            var $readPosts;
            var type;
            friendId = e.target.type;
            type = "[type='" + friendId + "']";
            $addToFriends = $(".add-to-friends" + type);
            $refuseProposition = $(".refuse-proposition" + type);
            $confirmProposition = $(".confirm-proposition" + type);
            $cancelProposition = $(".cancel-proposition" + type);
            $removeFriend = $(".remove-friend" + type);
            $readPosts = $(".read-posts" + type);
            usrId = APP.usrId;
            friendModel = this.collection.get(friendId);
            usrModel = this.collection.get(usrId);
            friendFriends = friendModel.get('friends');
            usrFriends = usrModel.get('friends');

            usrModelInFriendArr = _.filter(friendFriends, function (friend) {
                return friend._id == usrId;
            });

            usrIndexInFriendArr = friendFriends.indexOf(usrModelInFriendArr[0]);
            friendFriends.splice(usrIndexInFriendArr, 1);

            friendModelInUsrArr = _.filter(friendFriends, function (friend) {
                return friend._id == friendId;
            });

            friendIndexInUsrArr = usrFriends.indexOf(friendModelInUsrArr[0]);
            usrFriends.splice(friendIndexInUsrArr, 1);

            friendModel.set({friends: friendFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});
            usrModel.set({friends: usrFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});

            friendModel.save({patch: true});
            usrModel.save({patch: true});

            $addToFriends.show();
            $refuseProposition.hide();
            $confirmProposition.hide();
            $cancelProposition.hide();
            $removeFriend.hide();
            $readPosts.hide();
        },
        messagesCounter: function () {
            var $messagesCounter = $('#counter');
            console.log($messagesCounter);
            $.ajax({
                type: "POST",
                url: '/unread',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"part2": APP.usrId}),
                success: function (unread) {
                    console.log(unread.length);
                    $messagesCounter.text(unread.length);
                }
            });
        }
    });

    return FriendsView;
});