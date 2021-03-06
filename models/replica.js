//Module to get 'replica' mongoose model.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ModelSchema = new Schema({
    text: String,
    parts: [ObjectId],
    date: {type: Date, default: Date.now},
    sender: {firstName: String, lastName: String, id: ObjectId},
    read: Boolean
});
var Model = mongoose.model('replica', ModelSchema);

module.exports = Model;

