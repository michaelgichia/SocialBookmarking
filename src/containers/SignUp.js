import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import {APIManager} from '../utils'

export default class SignUp extends Component{
	constructor(){
		super()
		this.state = {
			visitor: {
				firstName: '',
				lastName: '',
				email: '',
				password: ''
			}
		}
	}

	componentWillMount() {
	}

	handleChange = (e) => {
		let updatedVistor = {...this.state.visitor}
		updatedVistor[e.target.id] = e.target.value
		this.setState({visitor: updatedVistor})
	}

	register = () => {
		APIManager.post('/api/profiles', this.state.visitor, (err, response) => {
			console.log(response)		
		})
	}

	render(){
		return(
			<div>
				<h4>Register</h4>
				<div>
					<TextField
			      hintText="First Name"
			      id="firstName"
			      onChange={this.handleChange}
			    /><br />
					<TextField
			      hintText="Last Name"
			      id="lastName"
			      onChange={this.handleChange}
			    /><br />
					<TextField
			      hintText="Email"
			      id="email"
			      onChange={this.handleChange}
			    /><br />
					<TextField
			      hintText="Password"
			      id="password"
			      onChange={this.handleChange}
			    /><br />		
					<button onClick={this.register}>Register</button>
				</div>
			</div>
		)
	}
}