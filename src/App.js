// App.js
import React, { Component, PropTypes } from 'react'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import * as actionCreators from './actions/index'
import Header from './components/presenters/header'
import { generateRandomTableEntry } from './helpers/tableParser'

class App extends Component {
	constructor(props) { 
		super(props)
	}

	componentDidMount() {
		//let { dispatch } = this.props
		//let action = actionCreators.updateText

    	//dispatch(action)
	}

	render() {
		let state = { ...this.props }

		return (
			<div>
				<Header className="header__app" value={ state.title.entry } />
				<p>{ generateRandomTableEntry() }</p>
				<button onClick={ state.onButtonClick }>Click Me</button>
			</div>
		);
	}
}

function mapStateToProps(state) { 
  return { ...state }
} 

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onButtonClick: () => dispatch(actionCreators.updateText)
  }
}

//export default connect( mapStateToProps, mapDispatchToProps )(App);
//export default hot(module)(App)
export default hot(module)(connect( mapStateToProps, mapDispatchToProps )(App))