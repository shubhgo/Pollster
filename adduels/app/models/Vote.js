var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
	duelID: String,
	voterID: String,
	action: String,
	didWin: Boolean,
	devNotes: String,
	updated_at: {type: Date, default: Date.now},
});

mongoose.model('Vote', VoteSchema);
