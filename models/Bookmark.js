var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BookMarkSchema = new Schema({
	profile: {type: String, default: ''},
	title: {type: String, trim: true, default: ''},
	url: {type: String, trim: true, default: ''},
	description: {type: String, trim: true, String, default: ''},
	image: {type: String, default: ''},
	timestamp: {type: Date, default: Date.now}
})

BookMarkSchema.methods.summary = function(){
	var summary = {
		id: this._id.toString(),
		profile: this.profile,
		title: this.title,
		url: this.url,
		description: this.description,
		image: this.image,
		timestamp: this.timestamp
	}
	return summary	
}

module.exports = mongoose.model('BookMarkModel', BookMarkSchema)