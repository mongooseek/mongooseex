//Collection to deal with users.
define([
    'collections/base',
    'models/negotiator'
], function (BaseCollection, NegotiatorModel) {

    var NegotiatorsCollection = BaseCollection.extend({
        content: "api\/negotiators",
        model: NegotiatorModel
    });
    return NegotiatorsCollection;
});