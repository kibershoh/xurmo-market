import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoading } from '../../Redux/slice/authSlice'
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
// import React from 'react'

// export const HideLink = () => {
//   return (
//     <div>HideLink</div>
//   )
// }


// const ShowOnLogout = () => {
//   return (
//     <div>ShowOnLogout</div>
//   )
// }

// export default ShowOnLogout