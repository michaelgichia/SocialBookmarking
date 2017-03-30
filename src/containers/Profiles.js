import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../actions'
import {APIManager} from '../utils'

class Profiles extends Component{
	constructor(props){
		super(props)
		this.state = {}
	}

	componentWillMount() {
		APIManager.get('/api/profiles', null, (err, response) => {
			if(err){
				let msg = err.message || err
				alert(err)
				return
			}
			const results = response.results
			this.props.actions.profilesReceived(results)
		})
	}

	renderProfiles = () => {
		let {list} = this.props.state.profiles
		return(
			list.map((profile, index) => (
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

const stateToProps  = (state) => ({state})

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(stateToProps, dispatchToProps)(Profiles)
