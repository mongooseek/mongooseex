//Module to get 'user' mongoose model.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var ModelSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    pass: String,
    location: String,
    dateOfBirth: Date,
    role: String,
    friends: [
        {
            added: {type: Date},
            status: String,
            id: {type: ObjectId, ref: 'user'}
        }
    ],
    city: {
        cityName: String,
        cityLongitude: Number,
        cityLatitude: Number
    },
    authorized: Boolean,
    confirmed: Boolean,
    photo: String
});
var Model = mongoose.model('user', ModelSchema);

module.exports = Model;

