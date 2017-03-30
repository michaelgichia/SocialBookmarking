import React, {Component} from 'react'
import {APIManager} from '../utils'

export default class Profiles extends Component{
	constructor(){
		super()
		this.state = {
			profiles: []
		}
	}

	componentWillMount() {
		APIManager.get('/api/profiles', null, (err, response) => {
			if(err){
				alert(err)
			}
			const results = response.results
			this.setState({profiles: results})
		})
	}

	renderProfiles = () => {
		let {profiles} = this.state
		return(
			profiles.map((profile, index) => (
				<li key={index}>
					<span>Name: {profile.firstName} {profile.lastName}</span>
				</li>
			))
		) 
	}

	render(){
		return(
			<ol>
				{this.renderProfiles()}
			</ol>
		)
	}
}