Backbone.Model.prototype.idAttribute = '_id';
// Backbone Model
var User = Backbone.Model.extend({
    defaults: {
        name: '',
        birth: '',
        location: ''
    }
});
// Backbone Collection
var Users = Backbone.Collection.extend({
    url: 'http://localhost:3000/api/users'
});

// Backbone View for one user

var UserView = Backbone.View.extend({
    model: new User(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('.users-list-template').html());
    },
    events: {
        'click .edit-user': 'edit',
        'click .update-user': 'update',
        'click .cancel': 'cancel',
        'click .delete-user': 'delete'
    },
    edit: function () {
        $('.edit-user').hide();
        $('.delete-user').hide();
        this.$('.update-user').show();
        this.$('.cancel').show();

        var name = this.$('.name').html();
        var birth = this.$('.birth').html();
        var location = this.$('.location').html();

        this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
        this.$('.birth').html('<input type="text" class="form-control birth-update" value="' + birth + '">');
        this.$('.location').html('<input type="text" class="form-control location-update" value="' + location + '">');
    },
    update: function () {
        this.model.set('name', $('.name-update').val());
        this.model.set('birth', $('.birth-update').val());
        this.model.set('location', $('.location-update').val());

        this.model.save(null, {
            success: function (response) {
                console.log('Successfully UPDATED user with _id: ' + response.toJSON()._id);
            },
            error: function (err) {
                console.log('Failed to update user!');
            }
        });
    },
    cancel: function () {
        usersView.render();
    },
    delete: function () {
        this.model.destroy({
            success: function (response) {
                console.log('Successfully DELETED user with _id: ' + response.toJSON()._id);
            },
            error: function (err) {
                console.log('Failed to delete user!');
            }
        });
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

// Backbone View for all users

var UsersView = Backbone.View.extend({
    model: new Users(),
    el: $('.users-list'),
    initialize: function () {
        var self = this;
        this.model.on('add', this.render, this);
        this.model.on('change', function () {
            setTimeout(function () {
                self.render();
            }, 30);
        }, this);
        this.model.on('remove', this.render, this);

        this.model.fetch({
            success: function (response) {
                _.each(response.toJSON(), function (item) {
                    console.log('Successfully GOT user with _id: ' + item._id);
                })
            },
            error: function () {
                console.log('Failed to get users!');
            }
        });
    },
    render: function () {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function (user) {
            self.$el.append((new UserView({model: user})).render().$el);
        });
        return this;
    }
});

var usersView = new UsersView();

$(document).ready(function () {
    $('.add-user').on('click', function () {
        var user = new User({
            name: $('.name-input').val(),
            birth: $('.birth-input').val(),
            location: $('.location-input').val()
        });
        $('.name-input').val('');
        $('.birth-input').val('');
        $('.location-input').val('');
        users.add(user);
        user.save(null, {
            success: function (response) {
                console.log('Successfully SAVED user with _id: ' + response.toJSON()._id);
            },
            error: function () {
                console.log('Failed to save user!');
            }
        });
    });
})