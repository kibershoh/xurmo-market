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
    console.log(data);
    const newData = productsData.filter(item => item?.user.email === currentUser.email).sort((a, b) => a.date - b.date);
    useEffect(() => {
        setData(newData)
    }, [productsData])




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
           
        </>
    )
}

export default MyOrders