import { combineReducers } from 'redux';
import { reducer as burgerMenu } from 'redux-burger-menu/immutable';
import user from './user';

const rootReducer = combineReducers({
  user,
  burgerMenu,
});

export default rootReducer;
