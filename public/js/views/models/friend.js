//View to deal with 'user' model.
define([
    'views/abstract/all',
    'text!templates/models/friend.html'
], function (AllView, template) {
    console.log("I am inside friend view");
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