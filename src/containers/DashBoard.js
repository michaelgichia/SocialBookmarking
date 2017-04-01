import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TextField, RaisedButton} from 'material-ui'
import { bindActionCreators } from 'redux'
import actions from '../actions'
import {APIManager} from '../utils'

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
		return(
			<div>
				<h4>Welcome {this.props.currentUser.firstName}</h4><br/><br/>
				<span>
					<h5>Add a bookmark</h5>
					<TextField
			      hintText="www.example.com"
			      type="text"
			      value={this.state.link}
			      onChange={this.handleChange}
			    /><br/>
			    <RaisedButton
			    	label="Submit"
			    	primary={true}
			    	onClick={this.submitLink}
			    />
				</span>
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
