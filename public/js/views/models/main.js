//View to deal with 'main user' model.
define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/models/main.html',
], function (Backbone, _, $, mainTemplate) {
    console.log("I am inside main view");
    var MainView = Backbone.View.extend({
        el: '#vrakashy',
        tmpl: _.template(mainTemplate),
        initialize: function () {
            this.render();
        },
        events: {

        },
        render: function () {
            var self = this;
            var $temporaryTemplate;
            $temporaryTemplate = $('.temporary-template');
            if($temporaryTemplate.length){
                $temporaryTemplate.remove();
            }
            this.$el.append(self.tmpl(self.model.toJSON()));
        }
    });
    return MainView;
});