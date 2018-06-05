import React from 'react';
 
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
