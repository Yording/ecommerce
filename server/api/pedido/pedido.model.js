'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

// se defien un Schema para agregar modelar el detalle de los item del pedido
var item = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  salePrice: Number,
  amount: Number
},
// se habilita coversión a objeto y jason a las propiedades virtuales
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
});

// se adiciona la propiedad virtual al Schema item
item.virtual('total').get(function(){
  return this.salePrice * this.amount;
});

var PedidoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  client: String,
  orderDate: { type: Date, default: Date.now },
  deliverDate: { type: Date, default: null },
  lastUpdate: { type: Date, default: Date.now },
  deliverAddress: String,
  orderState: Number,
  billState: Number,
  detail: [item]  // se define el detalle como un array de items
});

export default mongoose.model('Pedido', PedidoSchema);
