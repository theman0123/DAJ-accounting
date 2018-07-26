import React from 'react'
import Button from './Button'

class InvoiceForm extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {total: 0, showInput: true,}
  }
  
  sendInvoice() {
    console.log('invoice sent')
  }
  
  handleCompanyName () {
    console.log('company Name')
  }
  
  render() {
    const { companyName } = this.props
    const { total, showInput } = this.state
    
    const myInput = (
      <input
        style={styles.input}
        onChange={this.handleCompanyName}
        placeholder={companyName ? {companyName} : "Company Name"}
        tabIndex="1"/>
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
            <th style={styles.padB} colSpan="5">
              {'Here are your outstanding invoices for '}
              <span onClick={this.props.toggleShowInput}>
                { showInput
                  ? myInput
                  : companyName ? companyName : () => this.props.toggleShowInput(showInput)
                }
              </span>
            </th>
          </tr>
          <tr>
            <th style={{...styles.line, ...styles.padB}} colSpan="5"></th> {/* needs 'th' for 'tr' styles to be applied */}
          </tr>
          <tr>
            <th style={{...styles.padB, ...styles.padT}} colSpan="3">INVOICE TOTAL:</th>
            <th style={{...styles.padB, ...styles.padT}}>{total}</th>
          </tr>
          <tr>
            <th style={styles.line} colSpan="5"></th> {/* needs 'th' for 'tr' styles to be applied */}
          </tr>

          <tr>
            <th style={{...styles.padB, ...styles.padT}}> Invoice # </th>
            <th style={{...styles.padB, ...styles.padT}}> Date </th>
            <th style={{...styles.padB, ...styles.padT}}> Amount </th>
            <th style={{...styles.padB, ...styles.padT}}> Notes </th>
          </tr>
          <tr>
            <th> {/* Invoice # */}
              <span>
                <input style={styles.input} tabIndex="2" />
              </span>
            </th>
            <th>  {/* Date */}
              <span>
                <input style={styles.input} tabIndex="3" />
              </span>
            </th>
            <th> {/* Amount */}
              <span>
                <input style={styles.input} tabIndex="4" />
              </span>
            </th>
            <th>  {/* Notes */}
              <span>
                <input style={styles.input} tabIndex="5" />
              </span>
            </th>
            <th style={styles.saveBtn} tabIndex="99">Save</th>
          </tr>
          <tr style={styles.line} colSpan="5">
          </tr>
            <tr>
              <th colSpan="5"> Thank You! </th>
            </tr>
            <tr>
              <th colSpan="5"> Some Professional Company LLC </th>
            </tr>
        </tbody>
      </table>
    )
  }
}

export default InvoiceForm

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
  }
}