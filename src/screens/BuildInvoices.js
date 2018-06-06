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
        Build invoices under construction
        ....routes here.....
      </div>
    )
  }
}

const mapStateToProps = ({user}) => {
  const uid = user.get('authedId')
  const info = user.getIn([uid, 'info'])//needed?
  
  return {
    isAuthed: user.get('isAuthed'),
    authedId: user.get('authedId')
  }
}

export default connect(mapStateToProps)(BuildInvoices);