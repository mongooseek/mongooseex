define([
    'Mongoscripts',
    'views/userView'
], function (mons, UserView) {

    var userView = new UserView();

    function init() {
        console.log('UserView initialized from app!');
    }

    return {
        init: init
    };
});