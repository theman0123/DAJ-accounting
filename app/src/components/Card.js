import React from 'react'

export default ({details, selected, getEmails}) => {
  const {wrapper, header, card, highlight, body, name, email} = styles
  
  const cardStyles = selected === true
    ? highlight
    : card
  
  return details
    ? (
    <div style={styles.wrapper}>
      <div
        style={cardStyles}
        onClick={(e) => {
          selected = selected ? !selected : true
          console.log(selected)
          return getEmails(e, details)}
        }>
        <div style={styles.header}>
          <h3 style={styles.name}>{details.fullName}</h3>

        </div>
        <div style={styles.body}>
          <h4 style={styles.email}>{details.emails ? details.emails : 'no email'}</h4>
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
    margin: '1em',
    width: '14em',
    borderStyle: 'solid',
    borderRadius: '0.25em',
    textAlign: 'center',
    display: 'grid',
    boxShadow: '0em 0.25em .75em .25em #BAD58C'
  },
  header: {
    background: 'white',
    boxShadow: 'inset 0em 0em 1em #535354'
  },
  body: {
    background: '#7D8584',
    color: 'white',
  },
  card: {
    margin: '1em',
    width: '14em',
    border: 'solid black .1em',
    borderRadius: '0.25em',
    textAlign: 'center',
    display: 'grid',
    boxShadow: '0.25em 0.25em .5em .1em #A0A0A0',
  },
  name: {
    margin: '0.25em',
    padding: '0',
  },
  email: {
    margin: '0.25em',
    padding: '0',
  },
}