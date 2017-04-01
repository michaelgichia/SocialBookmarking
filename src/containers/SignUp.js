import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../actions'
import {APIManager} from '../utils'
import { bindActionCreators } from 'redux'
import Account from './Account'
import DashBoard from './DashBoard'

class SignUp extends Component{

	componentWillMount(){
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

	render(){
		return(
			<div>
				{this.props.currentUser != null ? 
					<DashBoard />
				:
					<Account />
				}
			</div>
		)
	}
}

const stateToProps  = ({account}) => ({
	currentUser: account.currentUser	
})

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(stateToProps, dispatchToProps)(SignUp)
