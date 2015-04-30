var mongoose = require('mongoose');

var AnalystSchema = new mongoose.Schema({
	name: String,
	email: String,
	boostID: String,
	devNotes: String,
	updated_at: {type: Date, default: Date.now},
});

mongoose.model('Analyst', AnalystSchema);
