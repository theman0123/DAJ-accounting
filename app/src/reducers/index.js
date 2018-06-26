import { combineReducers } from 'redux'
import { reducer as burgerMenu } from 'redux-burger-menu/immutable'
import user from './user'
import contacts from './contacts'

const rootReducer = combineReducers({
  user,
  burgerMenu,
  contacts,
})

export default rootReducer
