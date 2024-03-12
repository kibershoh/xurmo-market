import React, { useEffect, useState } from 'react'
// ~~~~~~~~~~~Hooks~~~~~~~~~~~//
import { Link, useNavigate } from 'react-router-dom';
// ~~~~~~~~~~~ React icons ~~~~~~~~~~~//
import { TbNumber } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";

// ~~~~~~~~~~~Redux~~~~~~~~~~~//
import { useSelector } from 'react-redux';

// ~~~~~~~~~~~Components~~~~~~~~~~~//
import CartItem from '../../UI_Design/CartItem';
import styles from './styles.module.scss'
import { formatCurrency } from '../../Constants/utils/moneyCurrent';
import useGetData from '../../Custom Hooks/UseGetData';
import MyOrdersItem from '../../UI_Design/MyOrdersItem';
import UseAuth from '../../Custom Hooks/UseAuth';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import clsx from 'clsx';
import { MdDelete } from 'react-icons/md';
const MyOrders = () => {
    const { currentUser } = UseAuth()
    const navigate = useNavigate()
    const { data: productsData, loading } = useGetData("orders")
    const [data, setData] = useState([])
    const [tab, setTab] = useState('last')

    //   console.log(productsData);
    //   const newData = productsData.filter((item)=>{
    //     item?.user.email === currentUser.email
    // })
    const newData = productsData.filter(item => item?.user.email === currentUser.email).sort((a, b) => a.date - b.date);
    useEffect(() => {
        setData(newData)
    }, [productsData])



    console.log(data);

    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, "orders", id))

    }
    const date = (time) => {
        const times = new Date(time)
        return times;

    }
    // useEffect(()=>{
    //     data.map((item)=>{
    //         console.log(item?.date.toDate().getMinutes());
    //     })
    // })
    useEffect(() => {
        new Date()
        console.log(new Date());

    })
    const formatDate = (n) => {
        return n < 10 ? '0' + n : n
    }
    const time = (date) => {
        const day = `${formatDate(date.toDate().getDate())}.${formatDate(date.toDate().getMonth() + 1)}.${formatDate(date.toDate().getFullYear())}, ${formatDate(date.toDate().getHours())} : ${formatDate(date.toDate().getMinutes())}`
        return day
    }
    const number = (num) => {
        if (String(num).length === 1) {
            return `000${num}`
        }
        if (String(num).length === 2) {
            return `00${num}`
        }
        if (String(num).length === 3) {
            return `0${num}`
        }
        else return num
    }
    console.log(String(23).length);
    return (
        <>
            <div className={styles.my_orders}>

                <div className={styles.tab_btn}>
                    <button onClick={() => setTab('last')} className={tab === 'last' ? styles.active_tab : styles.noActive_tab}>Last Order </button>
                    <button onClick={() => setTab('all')} className={tab === 'all' ? styles.active_tab : styles.noActive_tab}>All Order</button>

                </div>
                {
                    tab === 'last' ?
                        <>
                            {
                                data && data.length > 0 && (
                                    <div>
                                        <div className={styles.date_price}>
                                            <div>
                                                <p>Order <p className={styles.count_order}> <TbNumber size={25} /> {number(data.length)} </p> at  <h5>{time(data[data.length - 1]?.date)}</h5> </p>
                                                <span>accepted</span><MdDelete onClick={()=>deleteProduct(item.id)} className={styles.delete_order}/>
                                            </div>
                                            <span className={styles.total_price}>Total Price: {formatCurrency(data[data.length - 1]?.orderPrice)}</span>
                                        </div>
                                        <div className={styles.product_items}>
                                            <MyOrdersItem item={data[data.length - 1]} />
                                        </div>
                                    </div>
                                )
                            }
                        </> :
                        <>
                            {
                                data?.map((item, index) => (

                                    <div>
                                        <div className={styles.date_price}>
<div>
                                                <p>Order <p className={styles.count_order}> <TbNumber size={25} /> {number(data.length)} </p> at  <h5>{time(data[data.length - 1]?.date)}</h5> </p>
                                                <span>accepted</span><MdDelete onClick={()=>deleteProduct(item.id)} className={styles.delete_order}/>
                                            </div>
                                                                                        <span className={styles.total_price}>Total Price: {formatCurrency(item?.orderPrice)}</span>
                                        </div>
                                        <div className={styles.product_items}>
                                            <MyOrdersItem item={item} />
                                        </div>

                                    </div>

                                ))
                            }

                        </>
                }



            </div>
        </>
    )
}

export default MyOrders