var mongoose = require('mongoose');

var ADSchema = new mongoose.Schema({
	text: String,
	title: String,
	line1: String,
	line2: String,
	displayURL: String,
	destinationURL: String,
	devNotes: String,
	updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Ad', ADSchema);