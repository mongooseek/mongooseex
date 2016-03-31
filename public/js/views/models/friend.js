//View to deal with concrete(one) user model.
define([
    'views/abstract/all',
    'text!templates/models/friend.html'
], function (AllView, template) {

    var FriendView = AllView.extend({

        el: '.friend-item',

        tmpl: _.template(template),

        render: function () {
            var self = this;
            self.$el.append(self.tmpl(self.model.toJSON()));
            return this;
            self.messageSystem();
        }
    });

    return FriendView;
});