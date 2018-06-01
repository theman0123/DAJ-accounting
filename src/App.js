import React, { Component } from 'react';
import Navigation from './components/Navigation.js';

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.mainHeader}>
          <h1 style={styles.logo}> {'insert logo'} </h1>
          <Navigation />
        </div>
        <div style={styles.body}> {this.props.children} </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateRows: '[header] 5em [body-start] 1fr [body-end]'
  },
  logo: {
    fontFamily: 'cursive',
    marginLeft: '3em'
  },
  mainHeader: {
    gridRow: 'header'
  },
  body: {
    gridRow: 'body'
  }
}

export default App;
