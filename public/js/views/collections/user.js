//View to deal with 'user' collection.
define([
    'Backbone',
    'jQuery',
    'Underscore',
    'views/abstract/collections/base',
    'collections/user',
    'models/user',
    'views/models/user',
    'text!templates/collections/user.html',
    'Moment'
], function (Backbone, $, _, BaseView, UsersCollection, UserModel, UserView, template, moment) {

    var UsersView = BaseView.extend({
        tmpl: _.template(template),
        events: {
            'click .add-to-friends': 'addToFriends',
            'click .confirm-proposition': 'confirmProposition',
            'click .refuse-proposition': 'nullify',
            'click .cancel-proposition': 'nullify',
            'click .remove-friend': 'nullify',
            'click #message-button': 'message',
            'click .trash-button': 'removeUser',
            'click #filter-by-location': 'filterByLocation'
        },
        message: function () {
            console.log('You haven\'t chosen a person for conversation!');
        },
        removeUser: function (e) {
            e.preventDefault();
            var self = this;
            var userId = e.target.id;
            console.log(userId);
            var blockToRemove = 'tr[id="' + userId + '"]';
            var userModel = this.collection.get(userId);
            var $blockToRemove = $(blockToRemove);
            userModel.content = 'api/users';
            userModel.destroy({
                success: function (ressponce) {
                    self.collection.remove(userModel);
                    $blockToRemove.remove();
                },
                error: function (err) {

                }
            });
        },
        confirmProposition: function (e) {
            e.preventDefault();
            var added = moment();
            var friendId = e.target.type;
            var type = "[type='" + friendId + "']";
            var $refuseProposition = $(".refuse-proposition" + type);
            var $confirmProposition = $(".confirm-proposition" + type);
            var $removeFriend = $(".remove-friend" + type);
            var $readPosts = $(".read-posts" + type);
            var usrId = APP.usrId;
            var friendModel = this.collection.get(friendId);
            friendModel.content = 'api/users';
            var usrModel = this.collection.get(usrId);
            usrModel.content = 'api/users';
            var friendFriends = friendModel.get('friends');
            var usrFriends = usrModel.get('friends');

            var modelForFriendArray = {'_id': usrId, added: added, status: 'accepted'};
            var modelForUsrArray = {'_id': friendId, added: added, status: 'accepted'};

            var friendModelInUsrArr = _.filter(usrFriends, function (friend) {
                return friend._id == friendId;
            });

            var friendIndexInUsrArr = usrFriends.indexOf(friendModelInUsrArr[0]);

            usrFriends[friendIndexInUsrArr] = modelForUsrArray;

            var usrModelInFriendArr = _.filter(friendFriends, function (friend) {
                return friend._id == usrId;
            });

            var usrIndexInFriendArr = friendFriends.indexOf(usrModelInFriendArr[0]);

            friendFriends[usrIndexInFriendArr] = modelForFriendArray;

            friendModel.set({friends: friendFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});
            usrModel.set({friends: usrFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});

            friendModel.save({patch: true});
            usrModel.save({patch: true});

            $refuseProposition.hide();
            $confirmProposition.hide();
            $removeFriend.show();
        },
        addToFriends: function (e) {
            e.preventDefault();
            var friendId;
            var usrId;
            var friendModel;
            var usrModel;
            var usrFriends;
            var friendFriends;
            var modelForFriendArray;
            var modelForUsrArray;
            var added = moment();
            var $addToFriends;
            var $cancelProposition;
            friendId = e.target.type;
            usrId = APP.usrId;
            $addToFriends = $(".add-to-friends[type='" + friendId + "']");
            $cancelProposition = $(".cancel-proposition[type='" + friendId + "']");
            friendModel = this.collection.get(friendId);
            friendModel.content = 'api/users';
            usrModel = this.collection.get(usrId);
            usrModel.content = 'api/users';
            friendFriends = friendModel.get('friends');
            usrFriends = usrModel.get('friends');

            modelForFriendArray = {'_id': usrId, added: added, status: 'pending'};
            modelForUsrArray = {'_id': friendId, added: added, status: 'requested'};

            friendFriends.push(modelForFriendArray);
            usrFriends.push(modelForUsrArray);

            friendModel.set({friends: friendFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});
            usrModel.set({friends: usrFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});

            friendModel.save({patch: true});
            usrModel.save({patch: true});

            $addToFriends.hide();
            $cancelProposition.show();
        },
        render: function () {
            console.log('Clicked USERS BUTTON');
            var self = this;
            var userRole = this.collection.get(APP.usrId).get('role');
            var $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.length) {
                $temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl({"role": userRole}));
            var users = this.collection;
            users.forEach(function (userModel) {
                var view = new UserView({model: userModel});
            });
            self.messagesCounter()
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
            var usrId
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
            friendModel.content = 'api/users';
            usrModel = this.collection.get(usrId);
            usrModel.content = 'api/users';
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
        }
    });

    return UsersView;
});