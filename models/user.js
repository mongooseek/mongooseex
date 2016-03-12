var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    firstName: String,
    lastName: {type: String, default: ''},
    email: {type: String, unique: true},
    pass: String,
    location: String,
    dateOfBirth: {type: Date, default: Date.now},
    role: String,
    friends: Array,
    authorized: Boolean,
    confirmed: Boolean,
    photo: String
});
var Model = mongoose.model('user', ModelSchema);

module.exports = Model;

