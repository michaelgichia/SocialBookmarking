var Bookmark = require('../models/Bookmark')
var Promise = require('bluebird')

module.exports = {
	find: function(params) {
		return new Promise(function(resolve, reject) {
			Bookmark.find(params, function(err, bookmark){
				if(err){
					reject(err)
					return
				}
				resolve(bookmark)
			})
		})
	}
}