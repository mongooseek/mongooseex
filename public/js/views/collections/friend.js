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
], function (Backbone, $, _, BaseView, FriendsCollection, FriendModel, FriendView, template, moment) {

    var FriendsView = BaseView.extend({
        tmpl: _.template(template),
        events: {
            'click .remove-friend': 'nullify',
            'click #message-button': 'message',
            'click #filter-by-location': 'filterByLocation'
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
            var friendId = e.target.type;
            var type = "[type='" + friendId + "']";
            var $addToFriends = $(".add-to-friends" + type);
            var $refuseProposition = $(".refuse-proposition" + type);
            var $confirmProposition = $(".confirm-proposition" + type);
            var $cancelProposition = $(".cancel-proposition" + type);
            var $removeFriend = $(".remove-friend" + type);
            var usrId = APP.usrId;
            var friendModel = this.collection.get(friendId);
            var usrModel = this.collection.get(usrId);
            var friendFriends = friendModel.get('friends');
            var usrFriends = usrModel.get('friends');

            var usrModelInFriendArr = _.filter(friendFriends, function (friend) {
                return friend._id == usrId;
            });

            var usrIndexInFriendArr = friendFriends.indexOf(usrModelInFriendArr[0]);
            friendFriends.splice(usrIndexInFriendArr, 1);

            var friendModelInUsrArr = _.filter(friendFriends, function (friend) {
                return friend._id == friendId;
            });

            var friendIndexInUsrArr = usrFriends.indexOf(friendModelInUsrArr[0]);
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