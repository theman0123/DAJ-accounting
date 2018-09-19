import React from 'react'

export default ({details, selected, getEmails, seeMultipleEmails}) => {
  const {wrapper, header, card, highlight, body, name, email} = styles

  const cardStyles = selected ? highlight : card

  return details
    ? (
    <div style={styles.wrapper}>
      <div
        style={cardStyles}
        onClick={(e) => {
          getEmails(e, details)
        }}>
        <div style={styles.header}>
          <h3 style={styles.name}>{details.fullName}</h3>

        </div>
        <div style={styles.body}>
          <div style={styles.email}>{details.emails ? details.emails[0] : 'no email'}</div>
          {!details.emails
            ? null
            : details.emails.length > 1
              ? (<div style={styles.header}>...</div>)
              : null}
        </div>
      </div>
    </div>
    )
    : null
}

const styles = {
  wrapper: {
    display: 'flex',
  },
  highlight: {
    width: '14em',
    borderStyle: 'solid',
    borderRadius: '0.25em',
    textAlign: 'center',
    display: 'grid',
    boxShadow: '0em 0.25em .75em .25em #BAD58C',
    cursor: 'pointer',
  },
  header: {
    background: 'white',
    boxShadow: 'inset 0em 0em 1em #535354',
    color: 'black',
  },
  body: {
    background: '#7D8584',
    color: 'white',
    borderBottom: 'solid black .1em',
    paddingBottom: '0.25em',
  },
  card: {
    width: '14em',
    border: 'solid black .1em',
    borderRadius: '0.25em',
    textAlign: 'center',
    display: 'grid',
    boxShadow: '0.25em 0.25em .5em .1em #A0A0A0',
    cursor: 'pointer',
  },
  name: {
    margin: '0.25em',
  },
  email: {
    margin: '0.15em',
  },
}