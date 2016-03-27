//View is extended by login, logup, reset and newpass views.
define([
    'Backbone',
    'Underscore'
], function (Backbone) {
    var StartView = Backbone.View.extend({
        el: '#vrakashy',
        initialize: function () {
            console.log(this);
            this.render();
        },
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