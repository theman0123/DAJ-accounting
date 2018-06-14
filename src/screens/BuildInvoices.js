import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class BuildInvoices extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      me: {}
    }
  }
  
  componentDidMount() {
//    fetch(`https://maps.googleapis.com/maps/api/js?client=${'86405562588-vhqjatlr6n8da68oe7a0fbnnnrtjdosn.apps.googleusercontent.com'}&v=3.32&callback=initMap`)
//    fetch(`https://people.googleapis.com/v1/people/${this.state.me}
//`)
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