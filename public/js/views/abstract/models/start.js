//View is extended by login, logup, invite, reset and newpass views.
define([
    'views/abstract/all',
], function (AllView) {

    var StartView = AllView.extend({

        //Event trigger method to get and deal with data of mentioned forms.
        events: {
            'click #main-button': 'mainMethod'
        },

        render: function () {
            var self = this;
            var $temporaryTemplate;
            $temporaryTemplate = $('.temporary-template');
            if ($temporaryTemplate.length) {
                $temporaryTemplate.remove();
            }
            self.$el.append(self.tmpl);
        }
    });

    return StartView;
});