import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class BuildInvoices extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: '',
      isAuthed: ''
    }
  }
  
  render() {
    const {authedId} = this.props;
    
    return this.props.isAuthed === false
      ? <Redirect to="/google-login" />
      :(
      <div>
        <img src={this.props.avatar} />
        Build invoices under construction
      </div>
    )
  }
}

const mapStateToProps = ({user}) => {
  const uid = user.get('authedId')
  const info = user.getIn([uid, 'info']) 
  
  return {
    isAuthed: user.get('isAuthed'),
    authedId: user.get('authedId'),
    avatar: info ? info.imageUrl : null
  }
}

export default connect(mapStateToProps)(BuildInvoices);