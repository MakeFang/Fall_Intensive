const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const store = new Schema({
    storeId: {type: Schema.Types.ObjectId, ref: 'Store'},
    owner: {type: String, required: true},
    description: {type: String, required: true},
    inventory: [{type: String}]
});

const Store = mongoose.model('Store', store);
module.exports = Store;
