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

	componentDidMount(){
		APIManager.get('/account/currentuser', null, (err, response) => {
			if (err){
				alert(err)
				return
			}
			if (response.profile == null)
				return
			this.props.actions.currentUserReceived(response.profile)
		})
	}

	handleChange = (e) => {
		let updatedVistor = {...this.state.visitor}
		updatedVistor[e.target.id] = e.target.value
		this.setState({visitor: updatedVistor})
	}

	register = () => {
		APIManager.post('/account/register', this.state.visitor, (err, response) => {
			if(err){
				let msg = err.message || err
				alert(msg)
				return
			}
			this.props.actions.profileCreated(response.profile)
		})
	}

	login = (event) => {
		event.preventDefault()
		APIManager.post('/account/login', this.state.visitor, (err, response) => {
			if (err){
				let msg = err.message || err
				alert(msg)
				return
			}
			this.props.actions.currentUserReceived(response.profile)
		})
	}

	logout = () => {
		APIManager.get('/account/logout', null, (err, response) => {
			if (err){
				let msg = err.message || err
				alert(msg)
				return
			}
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
				{this.props.currentUser != null ? 
					<div>
						<h2>Welcome {this.props.currentUser.firstName}</h2>
						<RaisedButton
				    	label="Logout"
				    	primary={true}
				    	onClick={this.logout}
				    />
					</div>
				:
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
					      type="password"
					    /><br/>
					    <RaisedButton
					    	label="Register"
					    	primary={true}
					    	onClick={this.register}
					    />
						</div>
						<div>
							<h1></h1>
							<h4>Login</h4>
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
					      type="password"
					    /><br/>
					    <RaisedButton
					    	label="Login"
					    	primary={true}
					    	onClick={this.login}
					    />	
						</div>
					</div>
				}
			</div>
		)
	}
}

const stateToProps  = ({profiles, account}) => ({
	profiles: profiles.list,
	currentUser: account.currentUser	
})

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(stateToProps, dispatchToProps)(SignUp)
