import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleAuthButton from '../components/GoogleAuthButton';
import * as userActionCreators from '../actions/user'

class GoogleLogin extends React.Component {
//  constructor() {
//    super();
//  }
  
  componentDidMount() {
    //automatically login returning users redirect to route path
  }
  
  handleLogin = () => {
    console.log('logging in', this.props, this.props.fetchAndHandleAuthedUser())
    //bring in user actions and state
    //DONE
    //run fanout function
    //toggle fetch user
    //fetch user from google auth
    //place info on state
    //toggle fetch user false
    //redirect to relevant route
  }
  render() {
    console.log('props', this.props)
    return (
      <GoogleAuthButton login={this.handleLogin} />
    )
  }  
}

const mapStateToProps = (store) => {
  const userState = [
    'isFetching',
    'error',
    'isAuthed',
    'authedId'
  ];

  return userState.reduce((prevState, currentVal) => {
    prevState[currentVal] = store.user.get(currentVal);
    
    return prevState;
  }, {}); 
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);
