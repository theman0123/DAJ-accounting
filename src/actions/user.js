import auth from '../helpers/auth';
import { fetchUser } from '../helpers/api';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const FETCHING_USER = 'FETCHING_USER';
export const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
export const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER';

export type userType = {
  name: string,
  uid: string,
  avatar: string
};

export const authUser = (uid) => ({
  type: AUTH_USER,
  uid,
});

export const unauthUser = (uid) => ({
  type: UNAUTH_USER,
  uid,
});

export const fetchingUser = () => ({ type: FETCHING_USER });

export const fetchingUserFailure = (error) => {
  console.warn(error);
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user',
  };
};

export const fetchingUserSuccess =
  (uid, user) =>
({
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp: Date.now(),
});

export const removeFetchingUser = () => ({ type: REMOVE_FETCHING_USER });

export const fetchAndHandleAuthedUser = (responseObj) => {
  return function (dispatch) {
    const uid = responseObj.googleId;
    const user = responseObj
    dispatch(fetchingUserSuccess(uid, user))
  }
}

export const logout = (uid) => {
  return function (dispatch) {
    dispatch(unauthUser(uid))
  }
}
//, { logout, saveUser } from 'helpers/auth'
// set up permissions for authedUser
// set up api file for google contacts login/auth
// user should have email address on userObject
// import { formatUserInfo } from 'helpers/utils'
//
//export const logoutAndUnauthed = () => {
//  return function (dispatch) {
//    logout()
//    dispatch(unauthUser())
//  }
//}


//export function fetchAndHandleUser (uid) {
//  return function (dispatch) {
//    dispatch(fetchingUser())
//    return fetchUser()//uid
//      .then((user) => dispatch(fetchingUserSuccess(uid, user, Date.now())))
//      .catch((error) => dispatch(fetchingUserFailure(error)))
//  }
//}
//
    
//    return auth().then(({user, credentials}) => {
//      const userData = user.providerData[0]
//      const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
//      return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
//    })
//      .then(({user}) => saveUser(user))
//      .then((user) => dispatch(authUser(user.uid)))
//      .catch((error) => dispatch(fetchingUserFailure(error)))