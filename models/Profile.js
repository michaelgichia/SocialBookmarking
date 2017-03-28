var mongoose = require('mongoose')
var Schema = new mongoose.Schema

var ProfileSchema = Schema({
	firstName: {type: String, trim: true, default: ''},
	lastName: {type: String, trim: true, default: ''},
	email: {type: String, trim: true, default: ''},
	password: {type: String, default: ''}
	timestamp: {type: Date, default: Date.now}
})

module.exports = mongoose.model('ProfileModel', ProfileSchema)