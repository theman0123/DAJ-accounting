import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import SearchContacts from 'components/SearchContacts'
import Card from 'components/Card'

class BuildInvoices extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  handleSearch (value) {
    console.log('searching....', value)
  }

  render () {
    console.log(this.props)
    return this.props.isAuthed === false
      ? <Redirect to='/google-login' />
      : (
        <div>
          <SearchContacts handleSearch={this.handleSearch}/>
          <Card />
        </div>
      )
  }
}

const mapStateToProps = ({user, contacts}) => {
  console.log(contacts.get('list'))
  return {
    isAuthed: user.get('isAuthed'),
  }
}

export default connect(mapStateToProps)(BuildInvoices)

BuildInvoices.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

const styles = {

}