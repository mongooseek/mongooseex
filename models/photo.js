var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var ModelSchema = new Schema({
    photo: String,
    owner: {type: ObjectId, ref: 'user'}
});
var Model = mongoose.model('photo', ModelSchema);

module.exports = Model;