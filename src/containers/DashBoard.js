import React, {Component} from 'react'
import {connect} from 'react-redux'
import {RaisedButton} from 'material-ui'
import { bindActionCreators } from 'redux'
import {APIManager} from '../utils'

class DashBoard extends Component{

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
		return(
			<div>
				<h2>Welcome {this.props.currentUser.firstName}</h2>
				<RaisedButton
					label="Logout"
					primary={true}
					onClick={this.logout}
				/>
			</div>
		)
	}
}

const stateToProps  = ({account}) => ({
	currentUser: account.currentUser	
})

export default connect(stateToProps, null)(DashBoard)
