//View to deal with 'user' collection.
define([
    'Backbone',
    'jQuery',
    'Underscore',
    'views/abstract/collections/base',
    'collections/friend',
    'models/user',
    'models/friend',
    'views/models/friend',
    'text!templates/collections/friend.html',
    'Moment'
], function (Backbone, $, _, BaseView, FriendsCollection, UserModel, FriendModel, FriendView, template, moment) {

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
            this.messagesCounter();
            this.getMainUser();
            return this;
        },
        nullify: function (e) {
            e.preventDefault();
            console.log(this.usrModel);
            var friendId = e.target.type;
            var type = "[type='" + friendId + "']";
            var usrId = APP.usrId;
            var friendModel = this.collection.get(friendId);
            var usrModel = this.usrModel;
            var friendFriends = friendModel.get('friends');
            var usrFriends = usrModel.get('friends');
            var $friendItem = $("tr#" + friendId);

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

            friendModel.content = 'api/users';
            friendModel.save();
            usrModel.content = 'api/users';
            usrModel.save();

            $friendItem.remove();
        },
        getMainUser: function () {
            var self = this;
            var userModel;
            $.ajax({
                type: "POST",
                url: '/login',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                //data: JSON.stringify({"email": email}),
                success: function (user) {
                    userModel = new UserModel(user);
                    self.usrModel = userModel;
                }
            });
        }
    });

    return FriendsView;
});