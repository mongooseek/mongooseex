//View to deal with 'user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
], function (Backbone, _, $) {
    console.log("I am inside user view");
    var FriendView = Backbone.View.extend({
        el: '.friend-item',
        //tmpl: _.template(userTemplate),
        initialize: function () {
            console.log('FRIEND VIEW was INITIALIZED!!!');
            this.render();
        },
        events: {},
        render: function () {
            var friendshipTemplateUrl;
            var self = this;
            var friendsArr;
            var my;
            var myStatus;
            var iAmNotInFriends;
            friendsArr = self.model.get('friends');
            var $templateForUsers = $('#template-for-friends');
            if ($templateForUsers.attr('id')) {
                my = _.filter(friendsArr, function (me) {
                    return (me._id == APP.usrId);
                });
                iAmNotInFriends = my[0] == undefined;
                myStatus = (iAmNotInFriends) ? 'add' : my[0].status;
                friendshipTemplateUrl = 'text!templates/models/friendshipStatus/' + myStatus + '.html';
                require([friendshipTemplateUrl], function (template) {
                    self.tmpl = _.template(template);
                    self.$el.append(self.tmpl(self.model.toJSON()));
                });
                return this;
            }
        }
    });
    return FriendView;
});