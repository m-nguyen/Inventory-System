'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/*
	schema for creating an inventory, associates a part type with a quantity
*/

var InventorySchema = new Schema({
	Type: {
		type: Schema.ObjectId,
		ref: Parts,
		required: 'You need to choose a part type'
	},
	quantity: {
		type: Number,
		default: 0
	}
});

mongoose.model('Inventory', InventorySchema);
