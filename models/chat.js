var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var ModelSchema = new Schema({
    date: {type: Date, default: Date.now},
    owner: {type: ObjectId, ref: 'user'},
    ownerName: String,
    content: String
});
var Model = mongoose.model('chat', ModelSchema);

module.exports = Model;

