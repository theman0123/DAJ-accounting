import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as invoiceActionCreators from '../actions/invoice' 
import SearchContacts from 'components/SearchContacts'
import Card from 'components/Card'
import Error from '../components/Error'
import InvoiceModal from '../components/InvoiceModal'

// note: state is keeping track of Card id's @selected and search @results
// redux is keeping track of added emails (all for a given card) @invoice.recipients

class BuildInvoices extends React.Component {
  constructor (props) {
    super(props)

    this.state = {results: [], error: '', selected: []}
  }

  handleSearch = (value) => {
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

  handleCardClick = (e, {emails, fullName, id}) => {
    e.preventDefault()
    const { selected } = this.state

    if (emails === null) return this.setState({error: `no email for this card: ${fullName}`})

    emails.map((email, index) => {
      const value = email.get(index)
      const recipients = this.props.recipients

      // reset error for smooth error recovery
      if (this.state.error) this.setState({error: ''})
      // remove email/value if exists in list of recipients
      if (this.findIn(recipients, value)) {
        this.props.removeRecipient(index)
        this.setState({selected: selected.filter(cardId => cardId !== id)})
      }
      // otherwise place value in redux store
      else {
        this.props.addRecipient(value),
        this.setState({selected: selected.concat(id)})
      }
    })
  }
  
  findIn(list, value) {
    return list.find(item => item === value )
  }

  render () {
    const { error, results, selected } = this.state
    const contactsError = this.props.error
    
    return this.props.isAuthed === false
      ? <Redirect to='/google-login' />
      : (
        <div style={styles.mainContainer}>
          <div style={styles.topContainer}>
            <SearchContacts handleSearch={this.handleSearch}/>
            <InvoiceModal />
          </div>
          <div style={styles.error}>
            {error
              ? <Error error={error} />
              : contactsError
                ? <Error error={contactsError} />
                : null }
          </div>
          <div style={styles.autoGrid}>
            {results.length > 0
              ? results.map(person => {
                let checkForEmail = person.get('emails') ? person.get('emails') : null
                let p = {
                  id: person.get('resourceName'),
                  fullName: person.get('fullName'),
                  emails: checkForEmail ? checkForEmail.toJS() : null,
                }
                return (
                  <Card
                    key={p.id}
                    details={p}
                    getEmails={this.handleCardClick}
                    selected={selected}/>
                )
              })
              : null}
          </div>
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
    error: contacts.get('error'),
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
  topContainer: {
    display: 'flex',
    margin: '2em',
    alignSelf: 'center'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  autoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(14em, 1fr))',
    gridTemplateRows: 'repeat(auto-fit, minmax(5em, 6em))',
    justifyItems: 'center',
    gridGap: '1em',
    padding: '2em'
  },
  error: {
    alignSelf: 'center',
  }
}