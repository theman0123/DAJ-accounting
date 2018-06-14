import React from 'react'

export default ({ image }) => (
  <img 
    style={image ? {gridColumn: 'avatar'} : {display: 'none'}}
    src={ image }
    alt="user avatar" />
)
//insert into a gridTemplate: [avatar]