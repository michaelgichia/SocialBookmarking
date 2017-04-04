import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import NavBar from './NavBar'
import {Profiles, SignUp, Bookmarks} from '../containers'


// Home
class Home extends Component {
	render(){
		return (
			<div>
				<NavBar />
			  <Tabs inkBarStyle={styles.tabs}>
			    <Tab icon={<FontIcon className="material-icons">home</FontIcon>} >
		      	<SignUp />
			    </Tab>
			    <Tab icon={<FontIcon className="material-icons">chrome_reader_mode</FontIcon>} >
						<Grid>
						    <Row>
						      <Col xs={4} md={3}>
						      	<Profiles />
						      </Col>
						      <Col xs={8} md={8}>
						      	<Bookmarks />
						      </Col>
						    </Row>
						 </Grid>
			    </Tab>
			  </Tabs>
		 </div>
		)
	}
}
// Styles
const blueColor = '#454857'
const styles = {
	tabs: {
		backgroundColor: blueColor,
		marginBottom: 20
	}
}

export default Home

