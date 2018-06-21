import React from 'react'

export default (props) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.selected}></div>
      <div style={styles.card}>
        <div style={styles.header}>
          <h3 style={styles.name}>{'spencer james'}</h3>

        </div>
        <div style={styles.body}>
          <h4 style={styles.email}>{'email@knowsit.com'}</h4>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    
  },
  selected: {
//    background: 'green',
//    width: '2em',
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
    borderStyle: 'solid',
    borderLeft: 'thick green',
    borderRadius: '0.25em',
    textAlign: 'center',
    display: 'grid',
    boxShadow: '0.25em 0.25em #535354', //on select make this green
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