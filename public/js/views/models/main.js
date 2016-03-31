//View to deal with 'main user' model.
define([
    'Underscore',
    'jQuery',
    'views/abstract/all',
    'text!templates/models/main.html',
], function (_, $, AllView, template) {
    console.log("I am inside main view");
    var MainView = AllView.extend({
        tmpl: _.template(template),
        events: {
            'click #save-photo': 'savePhoto',
            'click #delete-photo': 'deletePhoto',
            'click #invite-friend': 'sendInvitation',
            'click #edit-profile': 'editProfile',
            'click #cancel-edition': 'cancelEdition',
            'click #save-profile': 'saveProfile'
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
            self.$el.append(self.tmpl(self.model.toJSON()));
            self.messagesCounter();
            self.messageSystem();
        },
        saveProfile: function () {
            $('.for-render').show();
            $('.for-edit').hide();
            console.log($('.for-edit input'));
        },
        editProfile: function () {
            $('.for-render').hide();
            $('.for-edit').show();
        },
        cancelEdition: function () {
            $('.for-render').show();
            $('.for-edit').hide();
        },
        sendInvitation: function () {
            var $emailField = $('#email-field');;
            var email = $emailField.val();;
            $emailField.val('');
            if(email) {
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
            } else {
                alert('You haven\'t input eny e-mail yet.');
            }
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