import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Home} from './layouts'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class App extends Component {
	render(){
		return(
			<MuiThemeProvider>
				<Home />
		  </MuiThemeProvider>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('root'))