var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    pass: String,
    location: String,
    dateOfBirth: Date,
    role: String,
    friends: [],
    authorized: Boolean,
    confirmed: Boolean,
    photo: String
});
var Model = mongoose.model('user', ModelSchema);

module.exports = Model;

