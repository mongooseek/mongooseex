//View to deal with 'user' model.
define([
    'views/abstract/all',
    'Underscore',
    'jQuery',
    'text!templates/models/friendshipStatus/accepted.html',
    'text!templates/models/friendshipStatus/add.html',
    'text!templates/models/friendshipStatus/pending.html',
    'text!templates/models/friendshipStatus/requested.html',
    'Moment'
], function (AllView, _, $, accepted, add, pending, requested, moment) {

    var UserView = AllView.extend({

        el: '.user-item',

        render: function () {
            var self = this;
            var template
            var friendsArr;
            var my;
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
            }
            self.messageSystem();
            return this;
        }
    });

    return UserView;
});