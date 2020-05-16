const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    name: String,
    description: String,
    imageCtgory: {type: String, default: '/images/default/category.jpg'},
    status: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Category', CategorySchema);