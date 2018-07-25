import React from 'react'
import Modal from 'react-modal'
import AttachInvoices from '../components/Button'

Modal.setAppElement('#root')

export default class InvoiceModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      showInput: true,
      total: 0,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
//    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
  toggleInvoiceModal = () => {
    console.log('clicked', this.props)
    this.state.modalIsOpen ? this.closeModal() : this.openModal()
  }
  
  sendInvoice() {
    console.log('invoice sent')
  }

  toggleShowInput = (show) => {
    const { companyName } = this.props
    
    if (!show && !companyName) this.setState({showInput: true})
    return null
  }
  
  handleCompanyName () {
    console.log('company Name')
    
  }
  //tabindex="1"

  render() {
    const { companyName } = this.props
    const { total, showInput } = this.state
    const myInput = (
      <p>
        <input
          onChange={this.handleCompanyName}
          placeholder={companyName ? {companyName} : "Company Name"}
          tabindex="1"/>
      </p>
    )
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={styles}
          contentLabel="Example Modal">

              <p style={{textAlign: 'center'}}> Hello, Hope this email finds you well.</p> 

              <p style={{textAlign: 'center'}}>
                {'Here are your outstanding invoices for '}
                <span onClick={this.toggleShowInput}>
                  { showInput
                    ? myInput
                    : companyName ? companyName : () => this.toggleShowInput(showInput)
                  }
                </span>
              </p>
              <hr style={{width: '500px'}} />
              <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <tr>
                  <th>INVOICE TOTAL:</th>
                  <th style={{paddingLeft: '100px'}}>{total}</th>
                </tr>
              </table>
              <hr />

              <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <tr>
                  <th style={{textAlign: 'left'}}> Invoice # </th>
                  <th> Date </th>
                  <th style={{textAlign: 'right'}}> Amount </th>
                  <th style={{paddingLeft: '20px'}}> Notes </th>
                </tr>
                <tr>
                  <th style={{textAlign: 'left'}}> {/* Invoice # */}
                    <span>
                      <input tabindex="2" />
                    </span>
                  </th>
                  <th>  {/* Date */}
                    <span>
                      <input tabindex="3" />
                    </span>
                  </th>
                  <th style={{textAlign: 'right'}}> {/* Amount */}
                    <span>
                      <input tabindex="4" />
                    </span>
                  </th>
                  <th style={{paddingLeft: '20px'}}>  {/* Notes */}
                    <span>
                      <input tabindex="5" />
                    </span>
                  </th>
                  <th><button tabindex="99">save</button></th>
                </tr>
              </table>
              <hr style={{width: '500px'}} />
                <table style={{marginLeft: 'auto', marginRight: 'auto', padding: '10px'}}>
                  <tr>
                    <th> Thank You! </th>
                  </tr>
                  <tr>
                    <th> Some Professional Company LLC </th>
                  </tr>
                </table>
            <button onClick={this.closeModal}>close</button>
            <button onClick={this.sendInvoice}>send</button>
        </Modal>
        <AttachInvoices handleClick={this.toggleInvoiceModal}>Attach Invoices</AttachInvoices>
      </div>
    )
  }
}

const styles = {
  modal: {
  },
  input: {
    color: 'lightgrey',
  },
  content : {
    background: '#fff',
  }
}