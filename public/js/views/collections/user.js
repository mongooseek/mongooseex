define([
    'Backbone',
    'jQuery',
    'collections/user',
    'models/user',
    'views/models/user',
    'text!templates/collections/user.html',
    'Moment'
], function (Backbone, $, UsersCollection, UserModel, UserView, usersTemplate, moment) {

    var UsersView = Backbone.View.extend({
        el: "#for-templates",
        tmpl: _.template(usersTemplate),
        initialize: function () {
            console.log("USER VIEW was INITIALIZED");
            this.render();
        },
        events: {
            'click .add-to-friends': 'addToFriends'
        },
        addToFriends: function (e) {
            var friendId;
            var friendModel;
            var userModel;
            var userFriends;
            e.preventDefault();
            friendId = e.target.type;
            friendModel = this.collection.get(friendId);
            userModel = this.collection.get(APP.userId);
            userFriends = userModel.get('friends');
            if (userFriends.indexOf(friendId) == -1 && friendId != APP.userId) {
                userFriends.push(friendId);
                userModel.set({friends: userFriends, dateOfBirth: moment(userModel.get('dateOfBirth'))});
                userModel.save();
            }
        },
        render: function () {
            console.log('Clicked USERS BUTTON');
            var self = this;
            var temporaryTemplate = $('.temporary-template');
            if (temporaryTemplate.attr('id')) {
                temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl);
            var users = this.collection;
            users.forEach(function (usrModel) {
                var view = new UserView({model: usrModel});
            });
            return this;
        }
    });

    return UsersView;
});