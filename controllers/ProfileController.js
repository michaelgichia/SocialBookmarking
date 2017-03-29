var Profile = require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')

module.exports = {
	find: function(params) {
		return new Promise(function(resolve, reject){
			Profile.find(params, function(err, profiles){
				if(err){
					reject(err)
					return
				}

				var summaries = []
				profiles.forEach(function(profile){
					summaries.push(profile.summary())
				})
				resolve(summaries)
			})
		})
	},

	findById: function(id){
		return new Promise(function(resolve, reject){
			Profile.findById(id, function(err, profile){
				if(err){
					reject(err)
					return
				}
				resolve(profile.summary())
			})
		})
	},

	create: function(params){
		return new Promise(function(resolve, reject){
			// hash password:
			var salt = bcrypt.genSaltSync(10);
			var password = params.password
			params['password'] = bcrypt.hashSync(password, salt)

			Profile.create(params, function(err, profile){
				if(err){
					reject(err)
					return
				}
				resolve(profile.summary())
			})
		})
	}
}