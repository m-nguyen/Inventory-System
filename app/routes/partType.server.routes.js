'use strict';

/**
 * Module dependencies.
 */
var partType = require('../../app/controllers/partType.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/parts')
		.get(partType.list)
		.post(partType.create);

	app.route('/parts/:id')
		.get(partType.read)
		.put(partType.update)
		.delete(partType.delete);

	// Finish by binding the article middleware
	//app.param('id', partType.id);
};
