import React from 'react';

export default ({ error, styles }) => (
  <div>
    {error.length > 0
      ? <h4 style={styles || self.style}> {`There was a problem: ${error}`}</h4>
      : null
    }  
  </div>
)

const self = {
  style: {
    color: 'red'
  }
}