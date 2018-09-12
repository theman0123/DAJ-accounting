import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import Button from '../components/Button'
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
          style={styles.modal}
          contentLabel="Example Modal">

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <InvoiceForm />
          
          </div>

          <div style={styles.horizontalChildren}>
            <Button
              size={'small'}
              theme={'light'}
              onClick={this.closeModal}
              style={styles.saveBtn}
              handleClick={this.toggleInvoiceModal}>
                close
            </Button>
            <Button
              size={'medium'}
              theme={'light'}
              onClick={this.sendInvoice}>
                send
            </Button>
          </div>
        </Modal>
        <Button
          size={'large'}
          theme={'dark'}
          handleClick={this.toggleInvoiceModal}>
            Attach Invoices
        </Button>
      </div>
    )
  }
}

export default connect(
  ({invoice}) => ({companyName: invoice.get('companyName')})
)(InvoiceModal)

const styles = {
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'lightgrey',
  },
  content : {
    background: '#fff',
  },
  saveBtn: {
    padding: '.25em',
    background: '#8EE0C4',
    borderColor: 'black',
    boxShadow: '.25em .25em .5em .15em #A4A486',
    cursor: 'pointer',
  },
  horizontalChildren: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}