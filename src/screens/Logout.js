import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/user';

class Logout extends React.Component {
  
  componentDidMount () {
    this.props.authedId > 0
      ? this.props.logout(this.props.authedId)
      : null
  }

  render() {
    return this.props.isAuthed === false 
      ? (
        <div style={styles.container}>
          <h3 style={styles.text}> {'No one is logged in... '}
            <span style={styles.toLogin}> {'Use the menu'} </span>
          </h3>
        </div>
      )
      : <h1 style={styles.text}>{'Logging Out...'}</h1>
  }
}

export default connect(
  ({ user }) => ({ isAuthed: user.get('isAuthed'), authedId: user.get('authedId') }),
  (dispatch) => bindActionCreators({logout}, dispatch)
)(Logout);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5em'
  },
  text: {
    textAlign: 'center'
  },
  out: {
    color: 'red'
  },
  toLogin: {
    color: '#8EC0E0'
  }
}