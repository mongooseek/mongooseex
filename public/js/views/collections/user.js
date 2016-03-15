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
            'click #filter-friends': 'filterFriends'
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
        addToFriends: function (e) {
            console.log('Clicked add to friends');
            var friendId;
            var friendModel;
            var usrModel;
            var usrFriends;
            e.preventDefault();
            friendId = e.target.type;
            friendModel = this.collection.get(friendId);
            usrModel = this.collection.get(APP.usrId);
            usrFriends = usrModel.get('friends');
            if (usrFriends.indexOf(friendId) == -1 && friendId != APP.usrId) {
                usrFriends.push(friendId);
                usrModel.set({friends: usrFriends, dateOfBirth: moment(usrModel.get('dateOfBirth'))});
                usrModel.save();
            }
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