define([
    'Backbone',
    'jQuery',
    'collections/user',
    'models/user',
    'views/models/user',
    'text!templates/collections/user.html'
], function (Backbone, $, UsersCollection, UserModel, UserView, usersTemplate) {

    var UsersView = Backbone.View.extend({
        el: "#for-templates",
        tmpl: _.template(usersTemplate),
        initialize: function () {
            console.log("USER VIEW was INITIALIZED");
            this.render();
        },
        events: {
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