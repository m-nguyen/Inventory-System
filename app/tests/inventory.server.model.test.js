'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	PartType = mongoose.model('PartType');

/**
 * Globals
 */
var partType;

/**
 * Unit tests
 */
describe('PartType Model Unit Tests:', function() {
	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return partType.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without partName', function(done) {
			partType.partName = '';

			return partType.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		PartType.remove().exec();
		done();
	});
});