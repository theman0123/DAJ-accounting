import React, { Component } from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import Navigation from './components/Navigation.js'
import noise from '../public/images/noise.png'

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
          {/*Navigation must be top level for overlay to function properly*/}
        <img style={styles.image} />
          {this.props.children}
      </div>
    );
  }
}

export default App
//src={noise}
const styles = {
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    opacity: '0.2',
    zIndex: '-1',
    marginTop: '-2em',
    opacity: '0.05',
    background: `url(${noise})`,
    /* tried various css attributes to get image to repeat, no luck
    backgroundSize: '100%',
    backgroundRepeat: 'repeat-y', */
  }
}
