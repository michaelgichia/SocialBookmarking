import React, {Component} from 'react'
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './stores'
import { Provider } from 'react-redux'
import {App} from './layouts'
injectTapEventPlugin()

render(
	<Provider store={ store.configureStore() }>
		<App />
	</Provider>,
	document.getElementById('root')
)

