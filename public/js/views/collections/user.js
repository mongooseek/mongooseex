//View to deal with 'user' collection.
define([
    'Backbone',
    'jQuery',
    'Underscore',
    'collections/user',
    'models/user',
    'views/models/user',
    'text!templates/collections/user.html',
    'Moment'
], function (Backbone, $, _, UsersCollection, UserModel, UserView, usersTemplate, moment) {

    var UsersView = Backbone.View.extend({
        el: "#for-templates",
        tmpl: _.template(usersTemplate),
        initialize: function () {
            console.log("USER VIEW was INITIALIZED");
            this.render();
        },
        events: {
            'click .add-to-friends': 'addToFriends',
            'click .refuse-proposition': 'nullify',
            'click .cancel-proposition': 'nullify',
            'click .confirm-proposition': 'confirmProposition',
            'click .remove-friend': 'nullify'
        },
        filterFriends: function () {
            var self = this;
            console.log('This user!->', this.collection.get(APP.usrId));
            var friends = this.collection.get(APP.usrId).get('friends');
            var $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.attr('id')) {
                $temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl);
            friends.forEach(function (friendId) {
                var friendModel = self.collection.get(friendId);
                var userView = new UserView({model: friendModel});
            });
        },
        confirmProposition: function (e) {
            e.preventDefault();
            console.log('Clicked confirm');
            var modelForFriendArray;
            var modelForUsrArray;
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
            var $refuseProposition;
            var $confirmProposition;
            var $removeFriend;
            var $readPosts;
            var type;
            var added = moment();
            friendId = e.target.type;
            type = "[type='" + friendId + "']";
            $refuseProposition = $(".refuse-proposition" + type);
            $confirmProposition = $(".confirm-proposition" + type);
            $removeFriend = $(".remove-friend" + type);
            $readPosts = $(".read-posts" + type);
            usrId = APP.usrId;
            friendModel = this.collection.get(friendId);
            usrModel = this.collection.get(usrId);
            friendFriends = friendModel.get('friends');
            usrFriends = usrModel.get('friends');

            modelForFriendArray = {'_id': usrId, added: added, status: 'accepted'};
            modelForUsrArray = {'_id': friendId, added: added, status: 'accepted'};

            friendModelInUsrArr = _.filter(usrFriends, function (friend) {
                return friend._id == friendId;
            });

            friendIndexInUsrArr = usrFriends.indexOf(friendModelInUsrArr[0]);

            usrFriends[friendIndexInUsrArr] = modelForUsrArray;

            usrModelInFriendArr = _.filter(friendFriends, function (friend) {
                return friend._id == usrId;
            });

            usrIndexInFriendArr = friendFriends.indexOf(usrModelInFriendArr[0]);

            friendFriends[usrIndexInFriendArr] = modelForFriendArray;

            friendModel.set({friends: friendFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});
            usrModel.set({friends: usrFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});

            friendModel.save({patch: true});
            usrModel.save({patch: true});

            $refuseProposition.hide();
            $confirmProposition.hide();
            $removeFriend.show();
            $readPosts.show();
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
        addToFriends: function (e) {
            e.preventDefault();
            console.log('Clicked add to friends');
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
            usrModel = this.collection.get(usrId);
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
            var $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.attr('id')) {
                $temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl);
            var users = this.collection;
            users.forEach(function (userModel) {
                var view = new UserView({model: userModel});
            });
            return this;
        }
    });

    return UsersView;
});