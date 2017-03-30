import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../actions'
import {TextField, RaisedButton} from 'material-ui'
import {APIManager} from '../utils'
import { bindActionCreators } from 'redux'

class SignUp extends Component{
	constructor(props){
		super(props)
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
			if(err){
				let msg = err.message || err
				alert(msg)
				return
			}
			this.props.actions.profileCreated(response.result)
		})
	}

	render(){
		const hintStyle = {
			fonstSize: 10,
			fontWeight: 300,
			marginTop: 0,
			color: "#00bcd4",
			backgroundColor: "#ffffff"
		}
		return(
			<div>
				<h4>Register</h4>
				<div>
					<TextField
			      hintText="First Name"
			      id="firstName"
			      onChange={this.handleChange}
			      hintStyle={hintStyle}
			    />
					<TextField
			      hintText="Last Name"
			      id="lastName"
			      onChange={this.handleChange}
			      hintStyle={hintStyle}
			    />
					<TextField
			      hintText="Email"
			      id="email"
			      onChange={this.handleChange}
			      hintStyle={hintStyle}
			    />
					<TextField
			      hintText="Password"
			      id="password"
			      onChange={this.handleChange}
			      hintStyle={hintStyle}
			    /><br/>
			    <RaisedButton
			    	label="Register"
			    	primary={true}
			    	onClick={this.register}
			    />
				</div>
			</div>
		)
	}
}

const stateToProps  = (state) => ({state})

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(stateToProps, dispatchToProps)(SignUp)