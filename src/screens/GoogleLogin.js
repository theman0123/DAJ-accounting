import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleLogin as GoogleAuth } from 'react-google-login';
import * as userActionCreators from '../actions/user'

class GoogleLogin extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { redirect: false }
  }
  
  success = response => {
    console.log('logging in', response, this.props); this.props.fetchAndHandleAuthedUser(response.profileObj);
    return this.setState({redirect: true});
  }
  
  failure = response => {
    return this.props.fetchingUserFailure(response.error)
  }
  render() {
    console.log('props', this.props)
    return this.state.redirect === true
      ? <Redirect to='/build-invoices' />
      : (
      <div style={styles.container}>
        <div style={styles.font}> {'Login with'} </div>

        <GoogleAuth
          clientId="86405562588-vhqjatlr6n8da68oe7a0fbnnnrtjdosn.apps.googleusercontent.com"
          buttonText="Google"
          onRequest={() => this.props.fetchingUser()}
          onSuccess={this.success}
          onFailure={this.failure}
          redirectUri="http://localhost:3000/build-invoices"
          style={styles.btn}
        />
      </div>
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2em'
  },
  btn: {
    padding: '1em',
    background: '#8EE0C4',
    borderColor: 'black',
    fontSize: '1.5em',
    boxShadow: '.25em .25em'
  },
  font: {
    fontSize: '1.25em',
    margin: '2em'
  }
}
