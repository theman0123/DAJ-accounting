import React from 'react';
import { 
  Switch,
  Route 
} from 'react-router-dom';
import App from './App.js';
import Home from './screens/Home.js';

export default class Routes extends React.Component {
  render() {
    return (
      <App>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </App>
    )
  }
}
