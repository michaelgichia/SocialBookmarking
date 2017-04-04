import React, { Component } from 'react'
import { APIManager } from '../utils'
import { connect } from 'react-redux'
import actions from '../actions'
import Card from '../components/Card'

const styles = {
	ul: {
		listStyleType: 'none'
	},
	li: {
		marginTop: 10,
		marginBottom: 10
	}
}

class Bookmarks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }

	componentDidUpdate(){
		const list = this.props.bookmarks[this.props.selected.id]
		if (list != null) return // already there, no need to query
			
		const params = {profile: this.props.selected.id}
		APIManager.get('/api/bookmark', params, (err, response) => {
			if (err) return
			this.props.bookmarksReceived(response.results, params)
		})

	}

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle})
  }

  renderBookmarks = (list) => ( 
  	(list == null) ? null : list.map((bookmark, i) => {
			return (
				<li key={i} style={styles.li}>
					<Card 
			      title={bookmark.title}
			      subtitle={bookmark.description}
			      avatar={bookmark.image}
						expanded={this.state.expanded}
						onToggle={this.handleToggle}
			    />
				</li>
			)
		})
	)

	render(){
		const list = (this.props.selected == null) ? null : this.props.bookmarks[this.props.selected.id]
		return (
			<ul style={styles.ul}>
				{this.renderBookmarks(list)}
			</ul>
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