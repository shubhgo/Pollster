var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
	duelID: String,
	voterID: String,
	action: {
		type: [{
			type: String,
			enum: ['VoteAdA', 'equal', 'VoteAdB', 'skip']
		}],
		default: ['skip']
	},
	didWin: Boolean,
	devNotes: String,
	updated_at: {type: Date, default: Date.now},
});

mongoose.model('Vote', VoteSchema);
