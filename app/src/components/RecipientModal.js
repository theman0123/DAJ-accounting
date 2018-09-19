import React from 'react'
import Modal from 'react-modal'
import Button from '../components/Button'


Modal.setAppElement('#root')



class RecipientModal extends React.Component {
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
    const { recipients } = this.props
    console.log(recipients)
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={{
            content: {
              top: '0em',
              left: '0em',
              height: '30vh',
              width: '50vw',
              margin: '2em',
            },
            overlay: { background: 'rgba(255, 255, 255, 0.45)'}}}
          contentLabel="Recipient Modal">

          <div style={styles.container}>
            <div style={styles.listEmails}>
              {recipients ? recipients.map(email => (
                <div style={styles.emails}>{email}</div>
              )) : null}
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
            </div>
          </div>
        </Modal>

        <Button
          size={'small'}
          theme={'light'}
          handleClick={this.toggleInvoiceModal}>
            To...
        </Button>
      </div>
    )
  }
}

export default RecipientModal

const styles = {
  content: {
    height: '50vh',
    display: 'flex',
    justifyContent: 'space-between'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  listEmails: {
    fontFamily: 'Roboto',
    fontSize: '1em',
  },
  emails: {
    margin: '.5em',
    padding: '.5em',
    border: '.15em solid grey',
    borderRadius: '.15em',
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