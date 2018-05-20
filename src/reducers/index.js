import { combineReducers } from 'redux'
import title from './title'
import counter from './counter'

/*
   export default combineReducers({
	  [ file ],
	  [ file ]
	  ...
	})
*/
export default combineReducers({
  title,
  counter
})
