import React from 'react';
import { 
  Switch,
  Route 
} from 'react-router-dom';
import App from './App.js';
import Home from './components/Home.js';

export default class Routes extends React.Component {
  render() {
    return (
      <App>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </App>
    )
  }
}
