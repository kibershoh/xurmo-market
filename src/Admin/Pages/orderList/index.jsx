import { useState } from 'react'
import UseAuth from '../../../Custom Hooks/UseAuth'
import useGetData from '../../../Custom Hooks/UseGetData'
import { MyOrdersUi, MyOrdersUiAdmin } from '../../../UI_Design'
import { useEffect } from 'react'
import styles from './styles.module.scss'
// ~~~~~~~~~~~Components~~~~~~~~~~~//

const OrderLists = () => {
    const { currentUser } = UseAuth()
    const { data: productsData, loading } = useGetData("orders")
    const [data, setData] = useState([])

    const newData = productsData.filter(item => item?.user.email === currentUser?.email).sort((a, b) => a.date - b.date);
    useEffect(() => {
        setData(newData)
    }, [productsData]) 
     
   
   
   
    return (
        
    <div className={styles.order_lists}>
    <MyOrdersUiAdmin currentUser = {currentUser} data = {data}/>
    </div>
    )
}

export default OrderLists;