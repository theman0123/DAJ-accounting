import React from 'react'

export default function ({children, handleClick}) {
  return (
    <div
      style={styles.button}
      onClick={handleClick}>
      
        {children}
      
    </div>
  )
}

const styles = {
  button: {
    display: 'flex',
    background: '#F7A460',
    border: '.25em solid #F78F3A',
    borderRadius: '.25em',
    width: '12em',
    height: '3em',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  }
}
