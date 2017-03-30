import React, { Component } from 'react'
import NavBar from './NavBar'
import {Profiles} from '../containers'

class Home extends Component {

	render(){
		return (
			<div>
				<NavBar />
				<div className="row">
					<div className="col-xs-3" style={{background:'#f9f9f9'}}>
						<Profiles />
					</div>

					<div className="col-xs-6">
						Middle

					</div>

					<div className="col-xs-3" style={{background:'#f9f9f9'}}>
						Right

					</div>

				</div>
			</div>
		)
	}
}

export default Home