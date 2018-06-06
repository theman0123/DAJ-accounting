import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './components/Navigation.js';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
          {/*Navigation must be top level for overlay to function properly*/}
        
          {this.props.children}
      </div>
    );
  }
}

export default App;
