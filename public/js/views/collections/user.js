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
            'click .refuse-proposition': 'nullifyProposition',
            'click .cancel-proposition': 'nullifyProposition',
            'click .confirm-proposition': 'confirmProposition',
            'click .remove-friend': 'nullifyProposition'
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
            var added = moment();
            friendId = e.target.type;
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

            console.log('friendModelInUsrArr', friendModelInUsrArr);
            console.log('usrFriends', usrFriends);
            friendIndexInUsrArr = usrFriends.indexOf(friendModelInUsrArr[0]);
            console.log('friendIndexInUsrArr', friendIndexInUsrArr);

            usrFriends[friendIndexInUsrArr] = modelForUsrArray;

            usrModelInFriendArr = _.filter(friendFriends, function (friend) {
                return friend._id == usrId;
            });

            console.log('usrModelInFriendArr', usrModelInFriendArr);
            console.log('friendFriends', friendFriends);
            usrIndexInFriendArr = friendFriends.indexOf(usrModelInFriendArr[0]);
            console.log('usrIndexInFriendArr', usrIndexInFriendArr);

            friendFriends[usrIndexInFriendArr] = modelForFriendArray;

            friendModel.set({friends: friendFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});
            usrModel.set({friends: usrFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});

            friendModel.save({patch: true});
            usrModel.save({patch: true});
        },
        nullifyProposition: function (e) {
            e.preventDefault();
            console.log('Clicked add to friends');
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
            friendId = e.target.type;
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
            friendId = e.target.type;
            usrId = APP.usrId;
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