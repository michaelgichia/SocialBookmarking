import React, {Component} from 'react'
import {connect} from 'react-redux'
import {APIManager} from '../utils'
import {bindActionCreators} from 'redux'
import actions from '../actions'
import Card from '../components/Card'


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

	renderProfiles = () => (
		this.props.profiles.map((profile, i) => (
			<li key={i}>
				<a onClick={() => this.selectProfile(profile)} href="#">
				{profile.firstName} {profile.lastName}
				</a>
			</li>
		))
	)

	render(){
		console.log(this.props)
		return(
			<div>
				Bookmarks by :
				<ol>
					{this.renderProfiles()}
				</ol>
			</div>
		)
	}
}

const stateToProps  = ({profiles}) => ({
	profiles:profiles.list,
	selected: profiles.selected
})

const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(stateToProps, dispatchToProps)(Profiles)

		