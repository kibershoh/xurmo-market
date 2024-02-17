import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import UseAuth from '../../Custom Hooks/UseAuth'

const ProtectedRoute = () => {
    const {currentUser} = UseAuth()
    return currentUser ? <Outlet/> : <Navigate to={'/login'}/>
  
}

export default ProtectedRoute