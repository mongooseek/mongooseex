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
    confirmed: Boolean,
    photo: {type: String, default: 'http://www.jordanhardware.com/styles/default/xenforo/avatars/avatar_m.png'}
});
var Model = mongoose.model('user', ModelSchema);

module.exports = Model;

