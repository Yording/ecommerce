'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  saleprice: Number,
  amount:Number,
  imageProduct: {
    type: String,
    default: 'assets/product/default.jpg'
  },
  tags:Array,
  active: {
    type:Boolean,
    default:true
  }
});

export default mongoose.model('Product', ProductSchema);
