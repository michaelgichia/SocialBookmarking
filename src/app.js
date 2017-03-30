import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import {Home} from './layouts'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class App extends Component {
	render(){
		return(
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<Home />
		  </MuiThemeProvider>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('root'))