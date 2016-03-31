//TODO - remove or change.
define([
    'Backbone',
    'jQuery',
    'Underscore',
    'views/abstract/collections/base',
    'collections/user',
    'models/user',
    'views/models/negotiator',
    'models/replica',
    'views/collections/replica',
    'text!templates/collections/negotiator.html',
    'Moment'
], function (Backbone, $, _, BaseView, UsersCollection, UserModel, NegotiatorView, ReplicaModel, ReplicasView, negotiatorsTemplate, moment) {

    var NegotiatorsView = BaseView.extend({
        tmpl: _.template(negotiatorsTemplate),
        events: {
            //Block of events connected to friendship.
            'click .add-to-friends': 'addToFriends',
            'click .confirm-proposition': 'confirmProposition',
            'click .refuse-proposition': 'nullify',
            'click .cancel-proposition': 'nullify',
            'click .remove-friend': 'nullify',
            //Block serves to catch events connected to reading posts of user's friends.
            'click #filter-by-location': 'filterByLocation'
        },
        render: function () {
            console.log('Clicked USERS BUTTON');
            var self = this;
            var $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.length) {
                $temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl);
            var negotiators = this.collection;
            negotiators.forEach(function (negotiatorModel) {
                var view = new NegotiatorView({model: negotiatorModel});
            });
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
        }
    });

    return NegotiatorsView;
});