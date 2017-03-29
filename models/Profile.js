var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProfileSchema = new Schema({
	firstName: {type: String, trim: true, default: ''},
	lastName: {type: String, trim: true, default: ''},
	email: {type: String, trim: true, default: ''},
	password: {type: String, default: ''},
	timestamp: {type: Date, default: Date.now}
})

module.exports = mongoose.model('ProfileModel', ProfileSchema)