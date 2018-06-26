import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GoogleLogin as GoogleAuth } from 'react-google-login'
import Error from '../components/Error'
import * as userActionCreators from '../actions/user'
import * as contactsActionCreators from '../actions/contacts'

class GoogleLogin extends React.Component {
  constructor (props) {
    super(props)

    this.state = { redirect: false }
  }

  success = response => {
    this.props.fetchAndHandleAuthedUser(response.profileObj)

    this.props.fetchingContacts()
    fetch(`https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses&pageSize=2000`, {
      headers: {
        'Authorization': `Bearer ${response.accessToken}`,
      },
    })
      .then(res => res.json())
      .then(people => this.props.fetchingContactsSuccess(people.connections))
      .catch(err => this.props.fetchingContactsFailure(err))

    this.setState({redirect: true})
  }

  failure = response => {
    return this.props.fetchingUserFailure(response.error)
  }
  render () {
    return this.state.redirect === true
      ? <Redirect to='/build-invoices' />
      : (
        <div style={styles.container}>
          <Error error={this.props.error} />
          <div style={styles.font}> {'Login with'} </div>
          {/* autoLoad only works on return visits with no browser refresh in developement */}
          <GoogleAuth
            clientId='86405562588-35bph3tgcq360c3udgfsluih3ub4tquv.apps.googleusercontent.com'
            buttonText='Google'
            onRequest={() => this.props.fetchingUser()}
            autoLoad={true}
            onSuccess={this.success}
            onFailure={this.failure}
            scope={'profile', 'email', 'https://www.googleapis.com/auth/contacts.readonly'}
            redirectUri='http://localhost:3000/build-invoices'
            style={styles.btn}/>
        </div>
      )
  }
}

const mapStateToProps = (store) => {
  const userState = [
    'isFetching',
    'error',
    'isAuthed',
    'authedId',
  ]

  return userState.reduce((prevState, currentVal) => {
    prevState[currentVal] = store.user.get(currentVal)

    return prevState
  }, {})
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...userActionCreators, ...contactsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin)

GoogleLogin.propTypes = {
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  fetchingUser: PropTypes.func.isRequired,
  fetchingContacts: PropTypes.func.isRequired,
  fetchingContactsSuccess: PropTypes.func.isRequired,
  fetchingContactsFailure: PropTypes.func.isRequired,
  fetchingUserFailure: PropTypes.func.isRequired,
  error: PropTypes.string,
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2em',
  },
  btn: {
    padding: '1em',
    background: '#8EE0C4',
    borderColor: 'black',
    fontSize: '1.5em',
    boxShadow: '.25em .25em .5em .15em #A4A486',
  },
  font: {
    fontSize: '1.25em',
    margin: '2em',
  },
  error: {
    color: 'red',
  },
}
