//Backbone abstract view will be extended by users, friends collections views.
define([
    'Backbone',
    'views/abstract/all'
], function (Backbone, AllView) {

    var CollectionsView = AllView.extend({

        //Method helps to filter users/friends by distance. The method could be extended with filtering by name.
        filterByLocation: function () {
            var $distanceField = $('#distance-field');
            var distance = $distanceField.val();
            var currentFragment;
            var baseFragment;
            var reForBaseFragment;
            var urlForFilteringByDistance;

            //To prevent incorrect distance data.
            if (distance && isFinite(distance)) {
                currentFragment = Backbone.history.getFragment();
                reForBaseFragment = /^myApp\/\w+/;
                baseFragment = currentFragment.match(reForBaseFragment);
                urlForFilteringByDistance = baseFragment + '/distance/' + distance;
                Backbone.history.navigate(urlForFilteringByDistance, {trigger: true});
            }
            else {
                alert('Please input correct value to make searching by location :)');
            }
        },
    });

    return CollectionsView;
});