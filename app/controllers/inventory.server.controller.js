'use strict';

/**
 * Module dependencies.
 */
var mongoose        = require('mongoose'),
	errorHandler    = require('./errors.server.controller'),
    PartType        = mongoose.model('PartType'),
	_               = require('lodash');

/**
 * Create a PartType
 */
exports.create = function(req, res) {
	var partType = new PartType(req.body);

	partType.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(partType);
		}
	});
};

/**
 * Show the current PartType
 */
exports.read = function(req, res) {
	res.json(req.partType);
};

/**
 * Update a PartType
 */
exports.update = function(req, res) {
	var partType = req.partType;

	partType = _.extend(partType, req.body);

	partType.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(partType);
		}
	});
};

/**
 * Delete an PartType
 */
exports.delete = function(req, res) {
	var partType = req.partType;

	partType.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(partType);
		}
	});
};

/**
 * Add to PartType quantity
 */
exports.add = function(req, res) {
    var partType = req.partType,
        query = { _id : partType._id},
        update = {$set: {quantity: partType.quantity + 1}};

    partType.update(query, update, function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(partType);
        }
    });
};


/**
 * List of PartTypes
 */
exports.list = function(req, res) {
    /**
     * This needs to be fixed
     */
	PartType.find()/*.sort('-created').populate('user', 'displayName')*/.exec(function(err, partTypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(partTypes);
		}
	});
};

/**
 * PartType middleware
 */
exports.partTypeByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'PartType is invalid'
		});
	}

	PartType.findById(id).exec(function(err, partType) {
		if (err) return next(err);
		if (!partType) {
			return res.status(404).send({
  				message: 'PartType not found'
  			});
		}
		req.partType = partType;
		next();
	});
};

/**
 * PartType authorization middleware
 
exports.hasAuthorization = function(req, res, next) {
	/*if (req.PartType.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};*/
