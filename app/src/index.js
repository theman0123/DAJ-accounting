import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import Amplify from 'aws-amplify'
import config from './config'
import store from './store'
import Routes from './Routes'
import App from './App'
import './index.css'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  //Storage: {
    //region: config.s3.REGION,
    //bucket: config.s3.BUCKET,
    //identityPoolId: config.cognito.IDENTITY_POOL_ID
  //},
  API: {
    endpoints: [
      {
        name: "invoice",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Routes />
      </App>
    </Router>
  </Provider>
, document.getElementById('root'));
