import React from 'react';
import { connect } from 'react-redux';
//import { NavLogout } from '../components/NavLogout'; 

class Logout extends React.Component {
  
//  componentDidMount () {
//    this.props.isAuthed === true
//      ? console.log('logout')
//      : null;
//  }

  render() {
    console.log(this.props)
    return this.props.isAuthed === false 
      ? (
      <div style={styles.container}>
        <h1 style={styles.text}>{'You are logged '}
          <span style={styles.out}>{'out'}</span>
        </h1>
        <h4>{'Bye!'}</h4>
      </div>
      )
      : <div style={styles.logout}> {'Logout'} </div>
  }
}

export default connect(
  ({ user }) => ({ isAuthed: user.get('isAuthed') })
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
    
  },
  out: {
    color: 'red'
  },
  logout: {
  }
}