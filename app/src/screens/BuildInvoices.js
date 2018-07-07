import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
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
    const { emails, id, fullName } = details

    if ( emails === null ) return this.setState({error: `no email for this card: ${fullName}`})

    const getEmails = !emails ? emails.get(0)
      : emails.map((email, index) => {
        const value = email.get(0)

        this.setState({error: ''})
        // change store.contacts.selected: true
        // pass on value to redux store.invoice.to: [value]
      })
    
// this.props.handleEmailArray
// this.props.handleEmailString
  }
  
  cardHandler (list) {
    return list.map(person => {
      let p = {
        id: person.get('resourceName'),
        fullName: person.get('fullName'),
        emails: person.get('emails')
      }
        return <Card key={p.id} details={p} getEmails={this.handleCardClick.bind(this)} />
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
            ? this.cardHandler(this.state.results)
            : null}
        </div>
      )
  }
}

const mapStateToProps = ({user, contacts}) => {
  return {
    isAuthed: user.get('isAuthed'),
    connections: contacts.get('list')
  }
}

export default connect(mapStateToProps)(BuildInvoices)

BuildInvoices.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

const styles = {

}