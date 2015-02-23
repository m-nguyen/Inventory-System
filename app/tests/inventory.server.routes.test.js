'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	PartType = mongoose.model('PartType'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, partType;

/**
 * PartType routes tests
 */
describe('PartType CRUD tests', function() {
	beforeEach(function(done) {
			partType = {
				partName: 'Part Name',
				category: 'Part Category'
			};
			done();
	});
	it('should be able to save a partType', function(done) {
		agent.post('/inventory')
			.send(partType)
			.expect(200)
			.end(function(partTypeSaveErr, partTypeSaveRes) {
				// Handle partType save error
				if (partTypeSaveErr) done(partTypeSaveErr);
				// Get a list of partTypes
				agent.get('/inventory')
					.end(function(partTypesGetErr, partTypesGetRes) {
						// Handle partType save error
						if (partTypesGetErr) done(partTypesGetErr);
						// Get partTypes list
						var partTypes = partTypesGetRes.body;
						// Set assertions
						(partTypes[0].user._id).should.equal(userId);
						(partTypes[0].title).should.match('Part Name');
						// Call the assertion callback
						done();
					});
			});
	});

	it('should not be able to save a partType if no name is provided', function(done) {
		// Invalidate partName field
		partType.partName = '';
		
				agent.post('/inventory')
					.send(partType)
					.expect(400)
					.end(function(partTypeSaveErr, partTypeSaveRes) {
						// Set message assertion
						(partTypeSaveRes.body.message).should.match('Part must have a name');
						
						// Handle partType save error
						done(partTypeSaveErr);
					});
	});

	it('should be able to update a partType', function(done) {
				// Save a new partType
				agent.post('/inventory')
					.send(partType)
					.expect(200)
					.end(function(partTypeSaveErr, partTypeSaveRes) {
						// Handle partType save error
						if (partTypeSaveErr) done(partTypeSaveErr);

						// Update Part Name
						partType.partName = 'WHY YOU GOTTA BE SO MEAN?';

						// Update an existing partType
						agent.put('/inventory/' + partTypeSaveRes.body._id)
							.send(partType)
							.expect(200)
							.end(function(partTypeUpdateErr, partTypeUpdateRes) {
								// Handle partType update error
								if (partTypeUpdateErr) done(partTypeUpdateErr);

								// Set assertions
								(partTypeUpdateRes.body._id).should.equal(partTypeSaveRes.body._id);
								(partTypeUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
	});

	it('should be able to get a list of partTypes', function(done) {
		// Create new partType model instance
		var partTypeObj = new PartType(partType);

		// Save the partType
		partTypeObj.save(function() {
			// Request partTypes
			request(app).get('/inventory')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single partType', function(done) {
		// Create new partType model instance
		var partTypeObj = new PartType(partType);

		// Save the partType
		partTypeObj.save(function() {
			request(app).get('/inventory/' + partTypeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('title', partType.partName);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should return proper error for single partType which doesnt exist', function(done) {
		request(app).get('/inventory/test')
			.end(function(req, res) {
				// Set assertion
				res.body.should.be.an.Object.with.property('message', 'PartType is invalid');

				// Call the assertion callback
				done();
			});
	});

	/*it('should be able to delete a partType', function(done) {
				agent.post('/inventory')
					.send(partType)
					.expect(200)
					.end(function(partTypeSaveErr, partTypeSaveRes) {
						// Handle partType save error
						if (partTypeSaveErr) done(partTypeSaveErr);

						// Delete an existing partType
						agent.delete('/inventory/' + partTypeSaveRes.body._id)
							.send(partType)
							.expect(200)
							.end(function(partTypeDeleteErr, partTypeDeleteRes) {
								// Handle partType error error
								if (partTypeDeleteErr) done(partTypeDeleteErr);

								// Set assertions
								(partTypeDeleteRes.body._id).should.equal(partTypeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
	});*/

	afterEach(function(done) {
		PartType.remove().exec();
		done();
	});
});
