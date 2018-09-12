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
  
  componentDidMount() {
    console.log(this.props)
//    this.props.setRowId()
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
    this.props.updateTemplate(name, id, value)
  }
  
  addInvoice = (e, id = this.props.currentRowId) => {
    e.preventDefault()
    
    id === this.props.currentRowId
      ? this.props.addAndSetNewRow(id + 1)
      : this.props.addAndSetNewRow(id)
  }
  
  editRow = (rowId) => {
//    console.log('edit row', rowId)
    this.props.setCurrentRowId(rowId)
  }

  render() {
    const { companyName } = this.props
    const { total, showInput } = this.state
    const invoices = this.props.invoices

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

          {invoices.map(({rowId, amount, date, invoiceId, notes}) => {

            let details = {
              amount,
              date,
              invoiceId,
              notes,
            }

            return (
              <InvoiceRow
                key={rowId}
                edit={this.props.currentRowId === rowId}
                currentRowId={this.props.currentRowId}
                details={details}
                rowId={rowId}
                syncStore={this.syncStore}
                editRow={this.editRow} />
            )
          })}

          <tr>
            <th>{/* to help center the button */}</th>
            <th
              colSpan="2"
              onClick={this.addInvoice}>
                <Button theme={'light'} >Add Invoice</Button>
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
  const invoices = invoice.get('invoices').toJS()
  const keys = Object.keys(invoices)
//  console.log()

  // immutableJs replaced rowId when set on state. Placing it here for easy reference
  return {
    companyName: invoice.get('companyName'),
    invoices: keys.map(keyNum => ({...invoices[keyNum], rowId: parseInt(keyNum)})),
    maxRowId: invoice.get('maxRowId'),
    currentRowId: parseInt(invoice.get('currentRowId')),
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