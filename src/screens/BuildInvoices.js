import React from 'react';
import { connect } from 'react-redux';
import GoogleAuthButton from '../components/GoogleAuthButton';

class BuildInvoices extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: '',
      isAuthed: ''
    }
  }
  
  handleLogin = () => {
    console.log('logging in')
  }
  
  testFunc = (e) => {
    e.preventDefault();
    console.log('test')
  }
  
  render() {
    return this.props.isAuthed === false
      ? <GoogleAuthButton login={this.handleLogin} /> 
      :(
      <div>
        Build invoices under construction
      </div>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {isAuthed: user.get('isAuthed')}
}

export default connect(mapStateToProps)(BuildInvoices);