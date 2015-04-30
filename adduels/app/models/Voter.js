var mongoose = require('mongoose');

var VoterSchema = new mongoose.Schema({
	name: String,
	email: String,
	boostID: String,
	income: {type: Number, default: 0},
	devNotes: String,
	updated_at: {type: Date, default: Date.now},
});

mongoose.model('Voter', VoterSchema);
