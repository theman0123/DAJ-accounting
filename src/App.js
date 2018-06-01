import React, { Component } from 'react';
import Navigation from './components/Navigation.js';

class App extends Component {
  render() {
    return (
      <div style={styles}>
        <Navigation />
        
        <div> {this.props.children} </div>
      </div>
    );
  }
}

const styles = {
  textAlign: 'center'
}

export default App;
