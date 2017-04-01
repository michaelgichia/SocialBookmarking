import React, { Component } from 'react'
import { APIManager } from '../utils'
import { connect } from 'react-redux'
import actions from '../actions'

class Bookmarks extends Component {

	componentDidUpdate(){
		const list = this.props.bookmarks[this.props.selected.id]
		if (list != null) return // already there, no need to query
			
		const params = {profile: this.props.selected.id}
		APIManager.get('/api/bookmark', params, (err, response) => {
			if (err) return
			this.props.bookmarksReceived(response.results, params)
		})

	}

	render(){
		const list = (this.props.selected == null) ? null : this.props.bookmarks[this.props.selected.id]
		return (
			<div>
				<h2>Bookmarks</h2>
				<ol>
					{ (list == null) ? null : list.map((bookmark, i) => {
							return <li key={bookmark.id}>{bookmark.description}</li>
						})
					}
				</ol>
			</div>

		)
	}
}

const stateToProps = (state) => {
	return {
		selected: state.profiles.selected,
		bookmarks: state.bookmark
	}
}

const dispatchToProps = (dispatch) => {
	return {
		bookmarksReceived: (bookmarks, params) => dispatch(actions.bookmarksReceived(bookmarks, params))
	}
}

export default connect(stateToProps, dispatchToProps)(Bookmarks)