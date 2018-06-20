import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchContacts from 'components/SearchContacts';

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
        <div style={styles.wrapper}>
          <div style={styles.card}>
            <div style={styles.header}>
              <h3 style={styles.name}>{'spencer james'}</h3>

            </div>
            <div style={styles.body}>
              <h4 style={styles.email}>{'email@knowsit.com'}</h4>
            </div>
          </div>
        </div>
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
  wrapper: {
    display: 'flex',
    background: '#BCF1AC',
    width: '0.5em',
    height: '5em',
  },
  selected: {
  },
  header: {
    background: 'white',
  },
  body: {
    height: '100%',
    background: 'linear-gradient(to bottom right, #F6F7DC, #D9FBFA)',
  },
  card: {
    height: '5em',
    width: '10em',
    borderStyle: 'solid',
    borderRadius: '0.25em',
    textAlign: 'center',
    borderLeft: 'none',
  },
  name: {
    margin: '0.25em',
    padding: '0',
  },
  email: {
    margin: '0.25em',
    padding: '0',
  },
}