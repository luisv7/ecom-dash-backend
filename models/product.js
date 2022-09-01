const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const products = new Schema({
    name: String,
    cost: Number,
    price: Number,
    stock: Number,
    sku: String,
    description: String,
    category: String,
    image: {type: String, default:'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'},
    size: String,
    color: String,
    brand: String,
},{timestamps: true});

module.exports = mongoose.model('Products', products);