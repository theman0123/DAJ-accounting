import React from 'react';
import { 
  Switch,
  Route 
} from 'react-router-dom';
import App from './App.js';

import Home from './screens/Home';
import BuildInvoices from './screens/BuildInvoices';
import GoogleLogin from './screens/GoogleLogin';

export default class Routes extends React.Component {
  render() {
    return (
      <App>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/google-login' component={GoogleLogin} />
          <Route path='/build-invoices' component={BuildInvoices} />
        </Switch>
      </App>
    )
  }
}
