import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../actions'
import {TextField, RaisedButton} from 'material-ui'
import {APIManager} from '../utils'
import { bindActionCreators } from 'redux'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

class Account extends Component{
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
				<RegisterForm
					onClick={this.register}
					onChange={this.handleChange}
					hintStyle={hintStyle}
				/>
				<LoginForm
					onChange={this.handleChange}
					onClick={this.login}
					hintStyle={hintStyle}
				/>
			</div>
		)
	}
}

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(null, dispatchToProps)(Account)
