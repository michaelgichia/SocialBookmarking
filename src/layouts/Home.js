import React, { Component } from 'react'
import NavBar from './NavBar'

class Home extends Component {

	render(){
		return (
			<div>
				<NavBar />
				<div className="row">
					<div className="col-md-3" style={{background:'#f9f9f9'}}>
						Left Side
					</div>

					<div className="col-md-6">
						Middle

					</div>

					<div className="col-md-3" style={{background:'#f9f9f9'}}>
						Right

					</div>

				</div>
			</div>
		)
	}
}

export default Home