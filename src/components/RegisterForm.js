import React from 'react'
import {TextField, RaisedButton} from 'material-ui'

export default (props) => (
	<div>
		<h4>Register</h4>
		<div>
			<TextField
	      hintText="First Name"
	      id="firstName"
	      onChange={props.onChange}
	      hintStyle={props.hintStyle}
	    />
			<TextField
	      hintText="Last Name"
	      id="lastName"
	      onChange={props.onChange}
	      hintStyle={props.hintStyle}
	    />
			<TextField
	      hintText="Email"
	      id="email"
	      onChange={props.onChange}
	      hintStyle={props.hintStyle}
	    />
			<TextField
	      hintText="Password"
	      id="password"
	      onChange={props.onChange}
	      hintStyle={props.hintStyle}
	      type="password"
	    /><br/>
	    <RaisedButton
	    	label="Register"
	    	primary={true}
	    	onClick={props.onClick}
	    />
	 	</div>
	</div>
)