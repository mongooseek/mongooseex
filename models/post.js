//Module to get 'post' mongoose model.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var ModelSchema = new Schema({
    title: String,
    owner: {type: ObjectId, ref: 'user'},
    firstName: String,
    lastName: String,
    photo: String,
    content: String,
    time: {
        type: Date, default: Date.now
    }
});
var Model = mongoose.model('post', ModelSchema);

module.exports = Model;

