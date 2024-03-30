import React, { useEffect, useState } from 'react'

// ~~~~~~~~~~~Components~~~~~~~~~~~//
import useGetData from '../../Custom Hooks/UseGetData';
import UseAuth from '../../Custom Hooks/UseAuth';
 
import { MyOrdersUi } from '../../UI_Design';
const MyOrders = () => {
    const { currentUser } = UseAuth()
    const { data: productsData, loading } = useGetData("orders")
    const [data, setData] = useState([])

    const newData = productsData.filter(item => item?.user.email === currentUser?.email).sort((a, b) => a.date - b.date);
    useEffect(() => {
        setData(newData)
    }, [productsData]) 
     
   
   
   
    return (
        
    <>
    <MyOrdersUi currentUser = {currentUser} data = {data}/>
    </>
    )
}

export default MyOrders