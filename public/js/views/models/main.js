//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/models/main.html',
], function (Backbone, _, $, template) {
    console.log("I am inside main view");
    var MainView = Backbone.View.extend({
        el: '#vrakashy',
        tmpl: _.template(template),
        initialize: function () {
            console.log(this);
            this.render();
        },
        events: {
            'click #save-photo': 'savePhoto',
            'click #invite-friend': 'sendInvitation'
        },
        sendInvitation: function () {
            var $emailField;
            var email;
            $emailField = $('#email-field');
            email = $emailField.val();
            $emailField.val('');
            $.ajax({
                type: "POST",
                url: '/invite',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"email": email}),
                success: function (val) {
                    alert('Invitation was sent.');
                }
            });
        },
        savePhoto: function () {
            console.log("Clicked save photo button.");
            var photo = $('#preview').attr('src');
            this.savePhotoFunc(photo);
        },
        deletePhoto: function () {
            console.log("Clicked delete photo button.");
            var photo = this.model.defaults.photo;
            this.savePhotoFunc(photo);
        },
        savePhotoFunc: function (photo) {
            this.model.set({photo: photo/*, dateOfBirth: moment(this.model.dateOfBirth)*/});
            this.model.urlRoot = '/api/users';
            this.model.save();
            $('#preview').attr('src', this.model.get('photo'));
        },
        render: function () {
            if (APP.usrId) APP.io.emit('start', APP.usrId);
            var self = this;
            self.model.content = 'api/users';
            var $temporaryTemplate;
            $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.length) {
                $temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl(self.model.toJSON()));
            self.messagesCounter();
        },
        messagesCounter: function () {
            var $messagesCounter = $('#counter');
            console.log($messagesCounter);
            $.ajax({
                type: "POST",
                url: '/unread',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"part2": APP.usrId}),
                success: function (unread) {
                    console.log(unread.length);
                    $messagesCounter.text(unread.length);
                }
            });
        }
    });
    return MainView;
});