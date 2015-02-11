'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var partSchema = new Schema({
	Serial: {
		type: String,
		default: '',
		required: 'Serial cannot be blank'
	},
	Type: {
		type: Number,
	}
});

mongoose.model('Parts', partSchema);
