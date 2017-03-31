import React, {Component} from 'react'
import {connect} from 'react-redux'
import {APIManager} from '../utils'
import {bindActionCreators} from 'redux'
import actions from '../actions'

class Profiles extends Component{

	componentDidMount(){
		APIManager.get('/api/profiles', null, (err, response) => {
			const results = response.results

			this.props.actions.profilesReceived(results)
		})
	}

	renderProfiles = () => {
		let {profiles} = this.props
		return(
			profiles.map((profile, index) => (
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

const stateToProps  = (state) => ({
	profiles: state.profiles.list
})

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(stateToProps, dispatchToProps)(Profiles)
