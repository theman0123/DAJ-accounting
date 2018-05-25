import React from 'react';

export default class WelcomeText extends React.Component {
  render () {
    return (
      <div className={text}> 
        {this.props.greeting}
      </div>
    )
  }
}

WelcomeText.props = {
  
};

const text = {
  fontSize: '2.5em'
}