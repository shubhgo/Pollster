var mongoose = require('mongoose');

var DuelSchema = new mongoose.Schema({
	adAID: String,
	adBID: String,
	keywords: String,
	clickReward: {type: Number, default: 0},
	winReward: {type: Number, default: 0},
	totalVotedNeeded: {type: Number, default: 30},
	analystID: String,
	//results of the duel
	votesACount: {type: Number, default: 0},
	votesBCount: {type: Number, default: 0},
	noOpinionCount: {type: Number, default: 0},
	voterComments: String,
	totalVotes: {type: Number, default: 0},
	totalViews: {type: Number, default: 0},
	status: {type: String, default: 'paused'},// possible values: paused, running, completed
	winStatus: String,// A, B, undefined
	devNotes: String,
	updated_at: {type: Date, default: Date.now},
});

mongoose.model('Duel', DuelSchema);
