import React from 'react'
import {TextField, RaisedButton} from 'material-ui'

export default (props) => (
  <div className="side_wrapper">

    <header className="profile-card_header">
      <div className="profile-card_header-container">
        <div className="profile-card_header-imgbox">
          <img src="http://placekitten.com/600/900" alt={props.currentUser.firstName} />
        </div>
          <h1>{props.currentUser.firstName} {props.currentUser.lastName}
            <span>I'm a software developer</span>
          </h1>
      </div>
    </header>

    <div className="profile-card_about">
      <h3>Add a bookmark</h3>
      <TextField
        hintText="www.example.com"
        type="text"
        value={props.value}
        onChange={props.onChange}
        fullWidth={true}
      /><br/>
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={props.onClick}
      />
    </div>
  </div>
)
