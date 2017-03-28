var mongoose = require('mongoose')
var Schema = new mongoose.Schema

var BookMarkSchema = Schema({
	profile: {type: String, default: ''},
	title: {type: String, trim: true, default: ''},
	url: {type: String, trim: true, default: ''},
	description: {type: trim: true, String, default: ''}
	image: {type: String, default: ''}
	timestamp: {type: Date, default: Date.now}
})

module.exports = mongoose.model('BookMarkModel', BookMarkSchema)