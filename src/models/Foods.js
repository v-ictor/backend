const {Schema, model} = require('mongoose');

const FoodsSchema = new Schema({
    title: String,
    description: String,
    imageFood: {type: String, default: '/images/default/food.jpg'},
    price: String,
    ingredients: String,
    // category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    category: String,
    status: {type: Boolean, default: true},
    created_at : {type: Date, default: Date.now()}
});

module.exports = model('Foods', FoodsSchema);