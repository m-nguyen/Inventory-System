'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * part's schemas
 */
var partTypeSchema = new Schema({
	Title: {
		type: String,
		default: 'N/A',
		trim: true,
		required: 'Title cannot be blank'
	},
	Category: {
		type: String,
		default: '',
		trim: true
	},
	firmWare: {
		type: String,
		default: '',
		trim: true
	},
	Quantity: {
		type: Number
	}
});

mongoose.model('PartType', partTypeSchema);

