import React from 'react'
import {TextField, RaisedButton} from 'material-ui'

export default (props) => (
	<div>
		<p className="header"><span>Register</span></p>
		<div>
			<TextField
	      hintText="First Name"
	      id="firstName"
	      onChange={props.onChange}
	      hintStyle={props.hintStyle}
	      fullWidth={true}
	    />
			<TextField
	      hintText="Last Name"
	      id="lastName"
	      onChange={props.onChange}
	      hintStyle={props.hintStyle}
	      fullWidth={true}
	    />
			<TextField
	      hintText="Email"
	      id="email"
	      onChange={props.onChange}
	      hintStyle={props.hintStyle}
	      fullWidth={true}
	    />
			<TextField
	      hintText="Password"
	      id="password"
	      onChange={props.onChange}
	      hintStyle={props.hintStyle}
	      type="password"
	      fullWidth={true}
	    />
	    <RaisedButton
	    	label="Register"
	    	primary={true}
	    	onClick={props.onClick}
	    />
	 	</div>
	</div>
)