var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var ModelSchema = new Schema({
    title: String,
    owner: {type: ObjectId, ref: 'user'},
    content: String
});
var Model = mongoose.model('post', ModelSchema);

module.exports = Model;

