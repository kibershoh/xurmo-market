import React from 'react'
import UseAuth from '../../Custom Hooks/UseAuth'

const HideLink = ({ children }) => {
  const {currentUser} = UseAuth()
  if (currentUser) {
    return children
  }

  return null
}

export const ShowOnLogout = ({ children }) => {
  const {currentUser} = UseAuth()
  if (!currentUser) {
    return children;
  }


  return null
}

export default HideLink
