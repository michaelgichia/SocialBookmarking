import React from 'react'
import {TextField, RaisedButton} from 'material-ui'

export default (props) => (
	<div>
		<p className="header"><span>Login</span></p>
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
    	label="Login"
    	primary={true}
    	onClick={props.onClick}
    />	
	</div>
)