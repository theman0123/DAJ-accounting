import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import AttachInvoices from '../components/Button'
import InvoiceForm from '../components/InvoiceForm'

Modal.setAppElement('#root')

class InvoiceModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
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
    this.state.modalIsOpen ? this.closeModal() : this.openModal()
  }

  render() {
    const { companyName } = this.props

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={styles}
          contentLabel="Example Modal">

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <InvoiceForm />
          
          </div>

          <button onClick={this.closeModal}>close</button>
          <button onClick={this.sendInvoice}>send</button>
        </Modal>
        <AttachInvoices handleClick={this.toggleInvoiceModal}>Attach Invoices</AttachInvoices>
      </div>
    )
  }
}

export default connect(
  ({invoice}) => ({companyName: invoice.get('companyName')})
)(InvoiceModal)

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