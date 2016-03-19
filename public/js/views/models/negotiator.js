//View to deal with 'user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    //'models/user',
    'text!templates/models/negotiator.html',
    'Moment'
], function (Backbone, _, $, negotiatorTemplate, moment) {
    console.log("I am inside user view");
    var NegotiatorView = Backbone.View.extend({
        el: '.negotiator-item',
        tmpl: _.template(negotiatorTemplate),
        initialize: function () {
            console.log('User VIEW and User MODEL initialized!!!');
            this.render();
        },
        events: {},
        render: function () {
            console.log('I am in negotiator render function!!!');
            var self = this;
            var $templateForNegotiators = $('#template-for-negotiators');
            if ($templateForNegotiators.attr('id')) {
                self.$el.append(self.tmpl(self.model.toJSON()));
            }
            /*var friendshipTemplateUrl;
             var self = this;
             var friendsArr;
             var my;
             var myStatus;
             var iAmNotInFriends;
             friendsArr = self.model.get('friends');
             var $templateForUsers = $('#template-for-negotiators');
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
             }*/
        }
    });
    return NegotiatorView;
});