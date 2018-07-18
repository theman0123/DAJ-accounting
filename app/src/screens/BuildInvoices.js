import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as invoiceActionCreators from '../actions/invoice' 
import SearchContacts from 'components/SearchContacts'
import Card from 'components/Card'
import Error from '../components/Error'

class BuildInvoices extends React.Component {
  constructor (props) {
    super(props)

    this.state = {results: [], error: '', selected: []}
  }

  handleSearch (value) {
    //make cards searchable
    const results = []
    const { connections } = this.props
    const regex = new RegExp(value, 'gi')

    if (value === "") this.setState({error: `cannot search for ""`, results: []})

    else {
      this.setState({error: ''})
      connections.filter(person => {
        const name = person.get('fullName')
        const emails = person.get('emails')

        name.match(regex)
          ? results.push(person)
          : null
      })

      results.length > 0
        ? this.setState({results})
        : this.setState({error: `No found matches for "${value}"`, results: []})
    }
  }

  handleCardClick (e, details) {
    e.preventDefault()
    const { emails, fullName } = details

    if (emails === null) return this.setState({error: `no email for this card: ${fullName}`})

    emails.map((email, index) => {
      const value = email.get(index)
      const recipients = this.props.recipients
      const toRemove = recipients.find(address => {
        return value === address
      })
      // reset error for smooth error recovery
      if (this.state.error) this.setState({error: ''})
      // remove email/value if exists in list of recipients
      if (toRemove) this.props.removeRecipient(index)
      // otherwise place value in redux store
      else this.props.addRecipient(value)
    })
  }

  render () {
    const { error, results } = this.state

    return this.props.isAuthed === false
      ? <Redirect to='/google-login' />
      : (
        <div>
          <SearchContacts handleSearch={this.handleSearch.bind(this)}/>
          {error
            ? <Error error={error} />
            : null}
          {results.length > 0
            ? results.map(person => {
              let p = {
                id: person.get('resourceName'),
                fullName: person.get('fullName'),
                emails: person.get('emails'),
              }
              return <Card key={p.id} details={p} getEmails={this.handleCardClick.bind(this)} />
            })
            : null}
        </div>
      )
  }
}

const mapStateToProps = ({user, contacts, invoice}) => {
  const recipients = invoice.get('recipients')

  return {
    isAuthed: user.get('isAuthed'),
    connections: contacts.get('list'),
    recipients: recipients.size > 0 ? recipients : [],
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(invoiceActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildInvoices)

BuildInvoices.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  recipient: PropTypes.array,
  get: PropTypes.func,
  addRecipient: PropTypes.func.isRequired,
  removeRecipient: PropTypes.func.isRequired,
}

const styles = {

}