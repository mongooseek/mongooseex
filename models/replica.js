//Module to get 'conversation' mongoose model.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var ModelSchema = new Schema({
    part1: {
        type: ObjectId,
        ref: 'user'
    },
    part2: {
        type: ObjectId,
        ref: 'user'
    },
    status: String, //receiver or sender
    text: String,
    date: Date
});
var Model = mongoose.model('replica', ModelSchema);

module.exports = Model;

