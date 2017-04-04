import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TextField, RaisedButton} from 'material-ui'
import { bindActionCreators } from 'redux'
import actions from '../actions'
import {APIManager} from '../utils'
import Avatar from '../components/Avatar'

class DashBoard extends Component{
	constructor(){
		super()
		this.state = {
			link: ''
		}
	}

	handleChange = (e) => {
		this.setState({link: e.target.value})
	}

	submitLink = (e) => {
		this.setState({link: ''})
		e.preventDefault()

		const bookmark = {
			profile: this.props.currentUser.id,
			url: this.state.link
		}

		APIManager.post('/api/bookmark', bookmark, (err, response) => {
			if (err){
				alert(err)
				return
			}

			this.props.actions.bookmarkCreated(response.result)
		})
	}

	render(){
		const {currentUser} = this.props
		return(
			<div>
				<Avatar
					currentUser={currentUser}
					value={this.state.link}
        	onChange={this.handleChange}
        	onClick={this.submitLink}
				/>
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

export default connect(stateToProps, dispatchToProps)(DashBoard)
