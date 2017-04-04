import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Home from './Home'

const grayColor = '#C7C9BE'
const lightColor = '#ECECEC'
const darkColor = '#626266'
const whiteColor = '#ffffff'
const transparent = 'transparent'
const greenColor = '#DAFAE4'
const creamColor = '#E0EFF1'
const zealColor = '#454857'
const blueColor = '#89CEDE'

const muiTheme = getMuiTheme({
  palette: {
    primary3Color: lightColor,
  },
  appBar: {
    color: creamColor,
    textColor: darkColor
  },
  textField: {
    textColor: grayColor,
    hintColor: grayColor,
    borderColor: lightColor,
    focusColor: blueColor
  },
  raisedButton: {
	 	color: whiteColor,
	  textColor: darkColor,
	  primaryColor: whiteColor,
	  primaryTextColor: blueColor,
	  secondaryColor: blueColor,
	  secondaryTextColor: blueColor
  },
  tabs: {
    backgroundColor: transparent,
    textColor: lightColor,
    selectedTextColor: zealColor,
  },
})

const App = () => (
	<MuiThemeProvider muiTheme={muiTheme}>
		<Home />
	</MuiThemeProvider>
)

export default App

