import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

class App extends Component {
	render(){
		return(
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<AppBar title="Social Bookmarking" />
		  </MuiThemeProvider>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('root'))