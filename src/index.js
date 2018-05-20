import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import rootReducer from './reducers/index'

const store = createStore(rootReducer)
const wrapper = document.createElement('div')

wrapper.setAttribute('id', 'root')
document.body.appendChild(wrapper)

ReactDOM.render(
	<Provider store={store}>
    	<App />
	</Provider>
	, document.getElementById('root')
)

//console.log('store', store, store.getState())
