import React from 'react'
import Button from './Button'
import { connect } from 'react-redux'
import * as invoiceActionCreators from '../actions/invoice.js'
import InvoiceRow from './InvoiceRow'

class InvoiceForm extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {total: 0, showInput: !this.props.companyName,}
  }
  
  sendInvoice() {
    console.log('invoice sent')
  }
  
  handleCompanyName = (e) => {
    e.preventDefault()
    this.props.updateCompanyName(e.target.value)
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') this.toggleShowInput(false)
    else null
  }
  
  toggleShowInput = (bool) => {
    const { companyName } = this.props
    const { showInput } = this.state

    if (!companyName) this.setState({showInput: true})
    if (typeof bool === 'boolean') return this.setState({showInput: bool})
    
    this.setState({showInput: true})
  }
  
  syncStore = (name, id, value) => {
    console.log(this.props)
    this.props.updateTemplate(name, id, value)
  }
  
  addInvoice = () => {
    console.log('clicked')
    this.props.addAndSetNewRowId()
  }

  render() {
    const { companyName } = this.props
    const { total, showInput } = this.state

    const myInput = (
      <input
        style={styles.input}
        onChange={this.handleCompanyName}
        placeholder={companyName ? {companyName} : "Company Name"}
        tabIndex="1"
        onChange={this.handleCompanyName}
        name="company-name"
        onKeyPress={this.handleKeyPress}
        value={companyName}/>
    )

    return (
      <table>
        <tbody>
          <tr>
            <th style={styles.padB} colSpan="5">
              {'Hello, Hope this email finds you well'}
            </th>
          </tr>

          <tr>
            <th
              style={styles.padB}
              colSpan="5">
              {'Here are your outstanding invoices for '}
            </th>
          </tr>

          <tr>
            <th
              colSpan="5"
              onClick={() => this.toggleShowInput(true)}
              style={styles.companyName}>
                { showInput
                  ? myInput
                  : companyName
                }
            </th>
          </tr>

          <tr>
            {/* needs 'th' AND 'tr' for styles to be applied */}
            <th style={{...styles.line, ...styles.padB}} colSpan="5"></th>
          </tr>
          <tr>
            <th style={{...styles.padB, ...styles.padT}} colSpan="3">INVOICE TOTAL:</th>
            <th style={{...styles.padB, ...styles.padT}}>{total}</th>
          </tr>
          <tr>
            {/* needs 'th' AND 'tr' for styles to be applied */}
            <th style={styles.line} colSpan="5"></th>
          </tr>

          <tr>
            <th style={{...styles.padB, ...styles.padT}}> Invoice # </th>
            <th style={{...styles.padB, ...styles.padT}}> Date </th>
            <th style={{...styles.padB, ...styles.padT}}> Amount </th>
            <th style={{...styles.padB, ...styles.padT}}> Notes </th>
          </tr>

          <InvoiceRow edit={true} rowId={this.props.currentRowId} syncStore={this.syncStore} />

          <tr>
            <th>{/* to help center the button */}</th>
            <th
              style={styles.saveBtn}
              colSpan="2"
              onClick={this.addInvoice}>
                Add Invoice
            </th>
          </tr>

          <tr>
            {/* needs 'th' AND 'tr' for styles to be applied */}
            <th style={{...styles.line, ...styles.padT}} colSpan="5"></th>
          </tr>

          <tr>
            <th colSpan="5"> Thank You! </th>
          </tr>

          <tr>
            <th colSpan="5"> {companyName} </th>
          </tr>
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = ({invoice}, props) => {
  return {
    companyName: invoice.get('companyName'),
    maxRowId: invoice.get('maxRowId'),
    currentRowId: invoice.get('currentRowId'),
  }
}


export default connect(mapStateToProps, invoiceActionCreators)(InvoiceForm)

const styles = {
  padB: {
    paddingBottom: '1em',
  },
  padT: {
    paddingTop: '1em',
  },
  line: {
    borderBottom: '.1em solid #000',
  },
  input: {
    padding: '.25em',
    fontFamily: 'Lora',
    color: 'red',
    maxWidth: '8em',
  },
  saveBtn: {
    padding: '.25em',
    background: '#8EE0C4',
    borderColor: 'black',
    boxShadow: '.25em .25em .5em .15em #A4A486',
    cursor: 'pointer',
  },
  companyName: {
    color: '#6FB4BC',
  }
}