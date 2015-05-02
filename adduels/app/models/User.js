'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: {type: String, default: ''},
	salt: String,
	email: String,
	role: {
		type: [{
			type: String,
			enum: ['voter', 'analyst']
		}],
		default: ['voter']
	},
	boostID: String,
	income: {type: Number, default: 0},
	devNotes: String,
	updated_at: {type: Date, default: Date.now},
});


UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);