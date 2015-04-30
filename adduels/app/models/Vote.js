var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
	duelID: String,
	voterID: String,
	action: String,
	didWin: Boolean,
	devNotes: String,
	updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Vote', VoteSchema);