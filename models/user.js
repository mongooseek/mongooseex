//Module to get 'user' mongoose model.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var ModelSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    pass: String,
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
        name: String,
        lat: Number,
        lng: Number
    },
    negotiators: [
        ObjectId
        //{id: {type: ObjectId, ref: 'user'}}
    ],
    authorized: Boolean,
    confirmed: Boolean,
    photo: String
});
var Model = mongoose.model('user', ModelSchema);

module.exports = Model;

