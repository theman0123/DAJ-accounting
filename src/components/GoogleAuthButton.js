import React from 'react';
//clientId: '86405562588-7577svk4u093j5milu9r57csrr23rbn5.apps.googleusercontent.com' 
class GoogleAuthButton extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div style={styles.container}>
        
        <p style={styles.font}>Sign in With</p>
        <button style={styles.btn} onClick={this.props.login}>Google</button>
        
      </div>
    )
  }  
}

export default GoogleAuthButton;

//styles

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
    fontSize: '1.25em'
  }
}
