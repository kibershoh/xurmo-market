import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import UseAuth from '../../Custom Hooks/UseAuth'

const ProtectedAdminRoute = () => {
    const {currentUser} = UseAuth()
    return (currentUser && currentUser?.displayName === "Admin" && currentUser?.email === "admin@gmail.com") ? <Outlet/> : <Navigate to={'/dashboard'}/>
  
}

export default ProtectedAdminRoute