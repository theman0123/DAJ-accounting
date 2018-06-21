import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchContacts from 'components/SearchContacts';
import Card from 'components/Card';

class BuildInvoices extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {}
  }
  
  componentDidMount () {
    
  }
  
  handleSearch (value) {
    console.log('searching....', value)
    //fetch contacts
  }
  
  render() {
    const {authedId} = this.props;
    
    return this.props.isAuthed === true
      ? <Redirect to="/google-login" />
      :(
      <div>
        <SearchContacts handleSearch={this.handleSearch}/>
        <Card />
      </div>
    )
  }
}
//          <div style={styles.selected}></div>

const mapStateToProps = ({user}) => {
  const uid = user.get('authedId')
  const info = user.getIn([uid, 'info'])//needed?
  
  return {
    isAuthed: user.get('isAuthed'),
    authedId: user.get('authedId')
  }
}

export default connect(mapStateToProps)(BuildInvoices);

const styles = {
  
}