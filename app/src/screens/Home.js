import React from 'react';
import WelcomeText from '../components/WelcomeText';

export default class Home extends React.Component {
  render() {
    return (
      <WelcomeText greeting={'Hope you\'re having a good day!'} />
    )
  }
}