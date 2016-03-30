//View to deal with 'user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/models/friendshipStatus/accepted.html',
    'text!templates/models/friendshipStatus/add.html',
    'text!templates/models/friendshipStatus/pending.html',
    'text!templates/models/friendshipStatus/requested.html',
    'Moment'
], function (Backbone, _, $, accepted, add, pending, requested, moment) {
    console.log("I am inside user view");
    var UserView = Backbone.View.extend({
        el: '.user-item',
        //tmpl: _.template(userTemplate),
        initialize: function () {
            console.log('User VIEW and User MODEL initialized!!!');
            this.render();
        },
        events: {},
        render: function () {
            var self = this;
            var template
            var friendsArr;
            var my;
            var myStatus;
            var iAmNotInFriends;
            var usrRole = ($('tbody').attr('role'));
            friendsArr = self.model.get('friends');
            var $templateForUsers = $('#template-for-users');
            if ($templateForUsers.length) {
                my = _.filter(friendsArr, function (me) {
                    return (me._id == APP.usrId);
                });
                iAmNotInFriends = my[0] == undefined;
                template = eval((iAmNotInFriends) ? "add" : my[0].status);
                self.tmpl = _.template(template);
                self.$el.append(self.tmpl(self.model.toJSON()));
                if (usrRole !== 'admin') {
                    $('a.trash-button').remove();
                }

                return this;
            }
        }
    });
    return UserView;
});