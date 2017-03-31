import React from 'react'
import {TextField, RaisedButton} from 'material-ui'

export default (props) => (
	<div>
		<h1></h1>
		<h4>Login</h4>
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
    	label="Login"
    	primary={true}
    	onClick={props.onClick}
    />	
	</div>
)