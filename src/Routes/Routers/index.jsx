import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Admin, Cart, Contact, Home, OrderHistory, Login, Register, Reset, Shop, Checkout, ProductDetails, MyOrders } from '../../Pages';
import ProtectedRoute from '../ProtectedRoute';
import { AddProduct, AllProducts, Dashboard, Edit, Users } from '../../Admin/Pages';
import ProtectedAdminRoute from '../ProtectedAdminRoute';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/shop/:id' element={<ProductDetails/>}/>
      <Route path='/contact' element={<Contact/>}/>
       <Route path='/*' element={<ProtectedRoute/>}>
      
        <Route path='checkout' element={<Checkout/>}/>
        
        <Route path='/*' element={<ProtectedAdminRoute/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='dashboard/all-products' element={<AllProducts/>}/>
        <Route path='dashboard/add-products' element={<AddProduct/>}/>
        <Route path='dashboard/users' element={<Users/>}/>
        <Route path='dashboard/orders' element={<Users/>}/>
        </Route>

      </Route>


      <Route path='/admin' element={<Admin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/reset' element={<Reset />} />
    </Routes>
  )
}

export default Routers