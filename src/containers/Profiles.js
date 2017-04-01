import React, {Component} from 'react'
import {connect} from 'react-redux'
import {APIManager} from '../utils'
import {bindActionCreators} from 'redux'
import actions from '../actions'

class Profiles extends Component{

	componentWillMount(){
		APIManager.get('/api/profiles', null, (err, response) => {
			const results = response.results
			this.props.actions.profilesReceived(results)
		})
	}

	selectProfile = (profile) => {
		this.props.actions.profileSelected(profile)
	}

	renderProfiles = () => {
		let {profiles} = this.props
		let name = null
		return(
			profiles.map((profile, i) => {
				if (this.props.selected == null)
					name = <a onClick={() => this.selectProfile(profile)} href="#">{ profile.firstName }</a>

				else if (this.props.selected.id == profile.id)
					name = <a onClick={() => this.selectProfile(profile)} href="#">
										<strong style={{color:'red'}}>{ profile.firstName }</strong>
									</a>
				else
					name = <a onClick={() => this.selectProfile(profile)} href="#">{ profile.firstName }</a>
				return <li key={profile.id}>{name}</li>
			})
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
	profiles: state.profiles.list,
	selected: state.profiles.selected
})

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(stateToProps, dispatchToProps)(Profiles)
