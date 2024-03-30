import React, { useMemo } from 'react'
import AddProduct from '../Add_Product'
import styles from './styles.module.scss'
import clsx from 'clsx'
// ~~~~~~~~~ Images ~~~~~~~~~~~//
import all_products from '../../../assets/services-image/all-products.png'
import { BsBoxes, BsThreeDots } from 'react-icons/bs'
import { TbLayoutDashboard, TbShoppingBagDiscount } from "react-icons/tb";
import { FaUsers } from 'react-icons/fa'
import { MdOutlineAttachMoney, MdOutlineToday } from 'react-icons/md'
import { RiExchangeDollarLine } from 'react-icons/ri'
import { FaRegRectangleList } from "react-icons/fa6";
import { LineChart } from '../../Components'
import { CategoriesPie } from '../Charts'
import useGetData from '../../../Custom Hooks/UseGetData'
import { useEffect } from 'react'
import { useState } from 'react'
import { formatCurrency } from '../../../Constants/utils/moneyCurrent'
import { animate, useMotionValue, useTransform } from 'framer-motion'

const Dashboard = () => {
    const { data: productsData, productsLoading } = useGetData('products')
    const { data: users, usersLoading } = useGetData('users')
    const { data: orders, ordersLoading } = useGetData('orders')
    const [countProducts, setCountProducts] = useState(0)
    const [countUsers, setCountUsers] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalOrderPrice, settotalOrderPrice] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const [countActiveUsers, setCountActiveUsers] = useState([])
    const [productItems, setproductItems] = useState([])
    const [countOrders, setCountOrders] = useState(0)
    const [todayOrders, setTodayOrders] = useState(0)
    const filteredEmail = (array, email) => {
        return array.filter((newEmail) => newEmail !== email)
    }
    const Today = (date) => {
      const day = date?.toDate().getDay()
        return day
    }
    const today =  new Date()
    useEffect(() => {
        // ~~~~~~~~~~~~~~
        setCountProducts(productsData?.length)

        // ~~~~~~~~~~~~~~~~~~
        setCountUsers(users?.length)


        // ~~~~~~~~~~~~~~~~~~
        setCountOrders(orders?.length)

        // ~~~~~~~~~~~~~~
        let activeUsers = []
        orders?.map((order) => {
            activeUsers.push(order.email)
        })
        const filteredArray = activeUsers.filter((item, index) => activeUsers.indexOf(item) === index);
        setCountActiveUsers(filteredArray.length)

        // ~~~~~~~~~~~~~ 
        const sum = productsData.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue?.price), 0);
        setTotalPrice(sum)

        // ~~~~~~~~~~~~~ 
         let summa = []
        orders?.map((item)=>{
            summa.push(...item?.productItems)  
        })
        setproductItems(summa)
       
        // ~~~~~~~~~~~~~~~~
       
        // ~~~~~~~~~~~~~~~~
        const TodayOrders = orders.filter((order)=>Today(order?.date) === today.getDay() )
        setTodayOrders(TodayOrders.length)


        // ~~~~~~~~~~~~~~~~
    const TotalOrderPrice =0
//   orders.map((order)=>{
//     console.log(order.orderPrice);
//   })       

        // ~~~~~~~~~~~~~~~~
        // ~~~~~~~~~~~~~~~~
         
    }, [productsData,users,orders])
  
 const sumBenefit = useMemo(() => {
    return productItems?.reduce((acc, item) => acc + item?.benefit, 0);
  }, [productItems]);
 const sumTotalOrderPrice = useMemo(() => {
    return orders?.reduce((acc, item) => acc + item?.orderPrice, 0);
  }, [orders]);


  

    return (
        <div className={styles.dashboard}>
            <div className={styles.service} >

                <div className={styles.service_about}>
                    <div className={styles.icon}>
                        <BsBoxes size={25} />
                    </div>

                    <div className={styles.name_price}>
                        <p>All Products </p>
                        <h3>{countProducts}</h3>

                    </div>


                </div>
                <div className={styles.service_about}>
                    <div className={styles.icon}>
                        <FaUsers size={25} />
                    </div>

                    <div className={styles.name_price}>
                        <p>Visitors </p>
                        <h3>{countUsers}<span className={styles.active_users}>/{countActiveUsers} <span>active</span></span></h3>

                    </div>


                </div>
                <div className={styles.service_about}>
                    <div className={styles.icon}>
                        <MdOutlineAttachMoney size={25} />
                    </div>

                    <div className={styles.name_price}>
                        <p>Total Price</p>
                        <h3>{formatCurrency(totalPrice)}</h3>

                    </div>


                </div>

                <div className={styles.service_about}>
                    <div className={styles.icon}>
                        <RiExchangeDollarLine size={25} />
                    </div>

                    <div className={styles.name_price}>
                        <p>Total Sales </p>
                        <h3>{formatCurrency(sumBenefit)}</h3>
                    </div>


                </div>
            </div>
            <div className={styles.service} >

                <div className={styles.service_about}>
                    <div className={styles.icon}>
                        <FaRegRectangleList size={25} />
                    </div>

                    <div className={styles.name_price}>
                        <p>Total Orders</p>
                        <h3>{countOrders}</h3>

                    </div>


                </div>
                <div className={styles.service_about}>
                    <div className={styles.icon}>
                        <MdOutlineToday size={25} />
                    </div>

                    <div className={styles.name_price}>
                        <p>Today's Orders </p>
                        <h3>{todayOrders}</h3>

                    </div>


                </div>
                <div className={styles.service_about}>
                    <div className={styles.icon}>
                        <MdOutlineAttachMoney size={25} />
                    </div>

                    <div className={styles.name_price}>
                        <p>Total Order Price</p>
                        <h3>{formatCurrency(sumTotalOrderPrice)}</h3>

                    </div>


                </div>

                <div className={styles.service_about}>
                    <div className={styles.icon}>
                        <TbShoppingBagDiscount size={25} />
                    </div>

                    <div className={styles.name_price}>
                        <p>Stock </p>
                        <h3>Empty</h3>

                    </div>


                </div>
            </div>


            <div className={styles.charts}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <CategoriesPie />
            </div>
        </div>
    )
}

export default Dashboard