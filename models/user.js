var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    firstName: String,
    lastName: {type: String, default: 'Pupkin'},
    email: String,
    pass: String,
    location: String,
    dateOfBirth: {type: Date, default: Date.now},
    role: String,
    friends: Array,
    authorized: Boolean,
    confirmed: Boolean
});
var Model = mongoose.model('user', ModelSchema);

module.exports = Model;

