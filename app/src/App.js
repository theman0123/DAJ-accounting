import React, { Component } from 'react';
import Navigation from './components/Navigation.js';
import noise from '../public/images/noise.png'

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
          {/*Navigation must be top level for overlay to function properly*/}
        <img style={styles.image} src={noise} />
          {this.props.children}
      </div>
    );
  }
}

export default App;

const styles = {
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    opacity: '0.2',
    zIndex: '-1',
    marginTop: '-2em',
    opacity: '0.05'    
  }
}
