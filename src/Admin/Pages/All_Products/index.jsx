import { collection, deleteDoc, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import getData from '../../../Custom Hooks/UseGetData'
import styles from './styles.module.scss'
import { TbNumber } from 'react-icons/tb'
import CartItemAdmin from '../../../UI_Design/CartItemAdmin'
import useGetData from '../../../Custom Hooks/UseGetData'
import Loader2 from '../../../Components/LoaderTable'
import { Loader } from 'rsuite'
import LoaderTable from '../../../Components/LoaderTable'
import UseAuth from '../../../Custom Hooks/UseAuth'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products")
if("lkjhgfcf"){
  console.log("Salom");
}
 const isLoading = ()=>{
  if(loading){
    return true
  }
 }

  return (
    <>

      <div id='all_products' className={styles.all_products}>
<div className={styles.add_product_btn}>
       <button><Link to={'/dashboard/add-products'}> <span>Add product</span> <FiPlus className={styles.fiPlus} size={22}/></Link></button>

</div>
        {           
          productsData.length === 0 ? <h1 className={styles.dont_add}>{!window.navigator.onLine ? <LoaderTable/>: <span>{!loading ? "Don't added product" : <LoaderTable/>}</span>}</h1>:

          <>
             
            <div className={styles.overflow_table}>
              <table>
               
                 <thead>
                  <tr>
                    <th scope="col"><TbNumber size={19} /> </th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
               
                <tbody>
                  {


                      productsData.map((item, index) => (
                        <CartItemAdmin item={item} key={index} number={index} />
                      ))

                  }
                </tbody>
              </table>
            </div>

          </>
        }


      </div>
    </>
  )
}

export default AllProducts