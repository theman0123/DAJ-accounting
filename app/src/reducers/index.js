import { combineReducers } from 'redux'
import { reducer as burgerMenu } from 'redux-burger-menu/immutable'
import user from './user'
import contacts from './contacts'
import invoice from './invoice'

const rootReducer = combineReducers({
  user,
  burgerMenu,
  contacts,
  invoice,
})

export default rootReducer
