import React, { Component } from 'react'
import NavBar from './NavBar'
import {Profiles, SignUp, Bookmarks} from '../containers'

class Home extends Component {

	render(){
		return (
			<div>
				<NavBar />
				<div className="container">
					<div className="row">
						<div className="col-xs-3" style={{background:'#f9f9f9'}}>
							<Profiles />
						</div>
						<div className="col-xs-5">
							<Bookmarks />
						</div>
						<div className="col-xs-4">
							<SignUp />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Home
