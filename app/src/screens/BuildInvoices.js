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
import RecipientModal from '../components/RecipientModal'


// state is tracking search results

class BuildInvoices extends React.Component {
  constructor (props) {
    super(props)

    this.state = {results: [], error: '',}
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

    if (emails === null) return this.setState({error: `no email for this card: ${fullName}`})

    emails.map((email, index) => {
      console.log(email)
      const { recipients }  = this.props

//      // reset error for smooth error recovery
      if (this.state.error) this.setState({error: ''})
      
//      // remove email if exists in list of recipients
      if (this.findIn(recipients, email)) {
        this.props.removeRecipient(email)
      }
//      // otherwise place value in redux store
      else {
        this.props.addRecipient(email)
      }
    })
  }
  
  findIn(list, email) {
    return list.find(item => item === email )
  }

  render () {
    const { error, results } = this.state
    const { recipients } = this.props
    const contactsError = this.props.error
    
    return this.props.isAuthed === false
      ? <Redirect to='/google-login' />
      : (
        <div style={styles.mainContainer}>
          <div style={styles.topContainer}>
            <RecipientModal recipients={recipients} />
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
                // check for emails
              
                let checkForEmail = person.get('emails') ? person.get('emails') : null
                let emailInJs = checkForEmail ? checkForEmail.toJS() : null
                
                // check logic for highlighting Cards
                // emails come in nested array, p.emails flattens 'emailInJs'
                
                let p = {
                  id: person.get('resourceName'),
                  fullName: person.get('fullName'),
                  emails: checkForEmail ? emailInJs.reduce((acc, val) => acc.concat(val), []) : null,
                }

                let toHighlight = p.emails ? this.props.recipients.some(email=> p.emails.includes(email)) : null

                return (
                  <Card
                    key={p.id}
                    details={p}
                    getEmails={this.handleCardClick}
                    selected={toHighlight}/>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    padding: '2em',
  },
  error: {
    alignSelf: 'center',
  }
}