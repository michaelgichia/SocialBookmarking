import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
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
			marginTop: 0,
		}
		return(
			<Grid>
			    <Row>
			      <Col xs={10} md={4} xsOffset={1}  mdOffset={1}>
							<LoginForm
								onChange={this.handleChange}
								onClick={this.login}
								hintStyle={hintStyle}
							/>
						</Col>
			      <Col xs={10} md={4} xsOffset={1}  mdOffset={1}>
							<RegisterForm
								onClick={this.register}
								onChange={this.handleChange}
								hintStyle={hintStyle}
							/>
						</Col>
			    </Row>
			 </Grid>
		)
	}
}

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(null, dispatchToProps)(Account)