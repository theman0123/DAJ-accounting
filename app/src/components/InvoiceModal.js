import React from 'react'
import Modal from 'react-modal'
import AttachInvoices from '../components/Button'
import InvoiceForm from '../components/InvoiceForm'

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

  toggleShowInput = (show) => {
    const { companyName } = this.props
    
    if (!show && !companyName) this.setState({showInput: true})
    return null
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
            <InvoiceForm
              toggleShowInput={this.toggleShowInput} />
          
          </div>

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