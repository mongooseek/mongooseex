define([
    'Backbone'
], function (Backbone) {

    var CollectionsView = Backbone.View.extend({
        initialize: function () {
            console.log('View for collections initialized!');
            this.render();
        },
        filterByLocation: function () {
            var $distanceField;
            var distance;
            var currentUrl;
            var distanceUrl;
            var distanceRe;
            var currentUrlIncludeDistance;
            var index;
            $distanceField = $('#distance-field');
            distance = $distanceField.val();
            currentUrl = Backbone.history.getFragment();
            distanceRe = /\/distance\/\d+/;
            currentUrlIncludeDistance = currentUrl.match(distanceRe);
            if (currentUrlIncludeDistance) {
                index = currentUrlIncludeDistance['index'];
                currentUrl = currentUrl.substring(0, index);
            }
            if (distance && isFinite(distance)) {
                distanceUrl = currentUrl + '/distance/' + distance;
                Backbone.history.navigate(distanceUrl, {trigger: true});
            } else {
                alert('Please input correct value to make searching by location :)');
            }
        },
    });
    return CollectionsView;
});