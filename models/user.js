//Module to get 'user' mongoose model.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var ModelSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    pass: String,
    dateOfBirth: {
        type: Date, default: Date.now
    },
    role: String,
    friends: [
        {
            added: {type: Date},
            status: String,
            id: {type: ObjectId, ref: 'user'}
        }
    ],
    city: String,
    location: {
        type: [Number],
        index: '2dsphere'
    },
    negotiators: [
        ObjectId
    ],
    confirmed: Boolean,
    confirmToken: String,
    photo: String,
    resetToken: String,
    tokenExpires: Date
});
var Model = mongoose.model('user', ModelSchema);

module.exports = Model;

