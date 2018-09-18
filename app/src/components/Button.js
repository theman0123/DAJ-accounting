import React from 'react'

export default function ({children, handleClick, customStyles, size, theme}) {
  return (
    <div
      style={customStyles
        || 
        {...styles.button,
         ...styles[size],
         ...{background: styles[theme], 
         border: `.25em solid ${styles[theme]}`,}
        }}
      onClick={handleClick}>
      
        {children}
      
    </div>
  )
}

const styles = {
  button: {
    display: 'flex',
    borderRadius: '.25em',
    margin: '1em',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '.25em .25em .5em .15em #A4A486',
  },
  dark: '#F7A460',
  light: '#8EE0C4',
  shadow: {
    dark:{ 
    },
    light: '',
  },
  large: {
    width: '12em',
    height: '3em',
  },
  medium: {
    width: '8em',
    height: '2em',
  },
  small: {
    width: '5em',
    height: '1em',
  }
}
