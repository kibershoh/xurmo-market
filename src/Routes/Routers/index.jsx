import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {  Cart, Contact, Home, Login, Register, Reset, Shop, Checkout, ProductDetails, MyOrders,LikedProducts,UserProfile } from '../../Pages';
import { AddProduct, AllProducts, Categories, Dashboard, Edit, OrderDetails, OrderLists, Users } from '../../Admin/Pages';
import ProtectedAdminRoute from '../ProtectedAdminRoute';
import ProtectedRoute from '../ProtectedRoute';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/shop/:id' element={<ProductDetails/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/liked' element={<LikedProducts/>}/>
      <Route path='/profile' element={<UserProfile/>}/>
      <Route path='/my_orders' element={<MyOrders/>}/>
       <Route path='/*' element={<ProtectedRoute/>}>
      
        <Route path='checkout' element={<Checkout/>}/>
        
        <Route path='/*' element={<ProtectedAdminRoute/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='dashboard/all-products' element={<AllProducts/>}/>
        <Route path='dashboard/add-products' element={<AddProduct/>}/>
        <Route path='dashboard/users' element={<Users/>}/>
        <Route path='dashboard/order-lists' element={<OrderLists/>}/>
        <Route path='dashboard/order_details/:id' element={<OrderDetails/>}/>
        <Route path='dashboard/edit/:id' element={<Edit/>}/>
        <Route path='dashboard/categories' element={<Categories/>}/>
        </Route>

      </Route>


      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/reset' element={<Reset />} />
    </Routes>
  )
}

export default Routers