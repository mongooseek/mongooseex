define([
    'views/abstract/all'
], function (AllView) {

    var CollectionsView = AllView.extend({
        
        filterByLocation: function () {
            var $distanceField;
            var distance;
            var currentFragment;
            var baseFragment;
            var reForBaseFragment;
            var urlForFilteringByDistance;

            $distanceField = $('#distance-field');
            distance = $distanceField.val();

            if (distance && isFinite(distance)) {
                currentFragment = Backbone.history.getFragment();
                reForBaseFragment = /^myApp\/\w+/;
                baseFragment = currentFragment.match(reForBaseFragment);
                console.log(baseFragment);
                urlForFilteringByDistance = baseFragment + '/distance/' + distance;
                Backbone.history.navigate(urlForFilteringByDistance, {trigger: true});
                console.log(urlForFilteringByDistance);
            }
            else {
                alert('Please input correct value to make searching by location :)');
            }
        },
    });
    return CollectionsView;
});