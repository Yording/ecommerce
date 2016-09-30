/**
 * Pedido model events
 */

'use strict';

import {EventEmitter} from 'events';
var Pedido = require('./pedido.model');
var PedidoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PedidoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Pedido.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PedidoEvents.emit(event + ':' + doc._id, doc);
    PedidoEvents.emit(event, doc);
  }
}

export default PedidoEvents;
