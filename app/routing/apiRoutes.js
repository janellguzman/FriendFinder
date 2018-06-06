// Pull in required dependencies
var path = require('path');

// Load Data - we're linking our routes to a series of "data" sources.
// These data sources hold arrays of information in the friends array.
var friends = require("../data/friends.js");

// Export API routes
module.exports = function(app) {

	// A GET route with the url / api / friends.This will 
    // be used to display a JSON of all possible friends.
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var userInput = req.body;
		var userResponses = userInput.scores;

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000;

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				console.log('Closest match found = ' + diff);
				console.log('Friend name = ' + friends[i].name);
				console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};