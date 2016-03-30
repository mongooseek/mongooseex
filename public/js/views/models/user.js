//View to deal with 'user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    //'text!templates/models/user.html',
    'Moment'
], function (Backbone, _, $, moment) {
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
            var friendshipTemplateUrl;
            var self = this;
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
                myStatus = (iAmNotInFriends) ? 'add' : my[0].status;
                friendshipTemplateUrl = 'text!templates/models/friendshipStatus/' + myStatus + '.html';
                require([friendshipTemplateUrl], function (template) {
                    self.tmpl = _.template(template);
                    self.$el.append(self.tmpl(self.model.toJSON()));
                    if(usrRole !== 'admin'){
                        $('a.trash-button').remove();
                    }
                });
                return this;
            }
        }
    });
    return UserView;
});