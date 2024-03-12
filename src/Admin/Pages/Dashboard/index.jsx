import React from 'react'
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

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
        <div  className={styles.service} >           
               
               <div className={styles.service_about}>
                   <div className={styles.icon}>
                    <BsBoxes size={25} /> 
                   </div>
                   
                   <div className={styles.name_price}>
                    <p>All Products </p>
                    <h3>250</h3>

                   </div>


               </div>
               <div className={styles.service_about}>
                   <div className={styles.icon}>
                    <FaUsers size={25} /> 
                   </div>
                   
                   <div className={styles.name_price}>
                    <p>Visitors </p>
                    <h3>25<span className={styles.active_users}>/12 <span>active</span></span></h3>

                   </div>


               </div>
               <div className={styles.service_about}>
                   <div className={styles.icon}>
                    <MdOutlineAttachMoney  size={25} /> 
                   </div>
                   
                   <div className={styles.name_price}>
                    <p>Total Price</p>
                    <h3>250</h3>

                   </div>


               </div>
               
               <div className={styles.service_about}>
                   <div className={styles.icon}>
                    <RiExchangeDollarLine  size={25} /> 
                   </div>
                   
                   <div className={styles.name_price}>
                    <p>Total Sales </p>
                    <h3>250</h3>

                   </div>


               </div>
        </div>
        <div  className={styles.service} >           
               
               <div className={styles.service_about}>
                   <div className={styles.icon}>
                    <FaRegRectangleList  size={25} /> 
                   </div>
                   
                   <div className={styles.name_price}>
                    <p>Total Orders</p>
                    <h3>120</h3>

                   </div>


               </div>
               <div className={styles.service_about}>
                   <div className={styles.icon}>
                    <MdOutlineToday  size={25} /> 
                   </div>
                   
                   <div className={styles.name_price}>
                    <p>Today's Orders </p>
                    <h3>2</h3>

                   </div>


               </div>
               <div className={styles.service_about}>
                   <div className={styles.icon}>
                    <MdOutlineAttachMoney  size={25} /> 
                   </div>
                   
                   <div className={styles.name_price}>
                    <p>Total Order Price</p>
                    <h3>250</h3>

                   </div>


               </div>
               
               <div className={styles.service_about}>
                   <div className={styles.icon}>
                    <TbShoppingBagDiscount   size={25} /> 
                   </div>
                   
                   <div className={styles.name_price}>
                    <p>Stock </p>
                    <h3>250</h3>

                   </div>


               </div>
        </div>
        
       
        <div className={styles.charts}>
        </div>
    </div>
  )
}

export default Dashboard