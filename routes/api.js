var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

router.get('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]
	if(controller == null) {
		res.json({
			confirmation: 'failed',
			message: 'Invalid Resource!'
		})
		return
	}
	controller.find(req.query)
		.then(function(entities){
			res.json({
				confirmation: 'success',
				results: entities
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'failed',
				message: err
			})
	})
})

router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]
	var id = req.params.id

	if(controller == null) {
		res.json({
			confirmation: 'failed',
			message: 'Resource '+resource+' is Invalid!'
		})
		return
	}
	controller.findById(id)
	.then(function(entity){
		res.json({
			confirmation: 'success',
			result: entity
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'failed',
			message: id+' not found!'
		})
	})
})

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]
	if(controller == null) {
		res.json({
			confirmation: 'failed',
			message: 'Resource '+resource+' Not Found!'
		})
		return
	}
	controller.create(req.body)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'failed',
			message: 'Resource '+resource+' Not Saved!'
		})
	})
})

module.exports = router