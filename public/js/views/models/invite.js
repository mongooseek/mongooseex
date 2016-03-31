//View to deal with model created using invitation form.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/abstract/models/start',
    'text!templates/models/invite.html',
], function (Backbone, _, $, StartView, template) {

    var InviteView = StartView.extend({

        tmpl: _.template(template),

        //Trigger when logup button of invitation form is clicked.
        mainMethod: function () {
            var self = this;
            var currentPath = Backbone.history.getFragment();
            var registrationData = this.getFormsData();
            var modelUrl;
            var viewUrl;
            registrationData.inviteToken = currentPath.substring(19, 39);
            if (registrationData.email && registrationData.pass && registrationData.pass == registrationData.confirm) {
                modelUrl = 'models/user';
                viewUrl = 'views/models/main';
                require([modelUrl, viewUrl], function (Model, View) {
                        self.model = new Model(registrationData);
                        self.model.content = 'invitation';
                        self.model.save(null,
                            {
                                success: function (response) {
                                    self.model.content = 'api/users';
                                    APP.usrId = self.model.get('_id');
                                    if (self.view) {
                                        self.view.undelegateEvents();
                                    }
                                    self.view = new View({model: self.model});
                                    Backbone.history.navigate('myApp/start/main', {replace: true});
                                },
                                error: function (err) {
                                    console.log(err);
                                }
                            });
                    }
                )
            }
        }
    });

    return InviteView;
});