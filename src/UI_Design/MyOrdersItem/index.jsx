import React, { useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { HiMinus } from 'react-icons/hi'
import { MdOutlineDelete } from 'react-icons/md'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { RiDeleteBin5Line } from 'react-icons/ri'
import CartSlider from '../../Pages/cart/slider'
import { cartActions } from '../../Redux/slice/cartSlice'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../Firebase/config'
import { formatCurrency } from '../../Constants/utils/moneyCurrent'
import { BsArrowRightShort } from 'react-icons/bs'

const MyOrdersItem = ({ item }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({})


  console.log(item);
  const title = ["", "Name:", "Count:", "Price:"]

  return (
    <div className={styles.my_order_items}>
      {
        item.productItems?.map((product) => (
          <div className={styles.my_order}>
            <div>
              <CartSlider images={product?.images}/>
            </div>
            
           <div className={styles.desc}>
             <div className={styles.name_price}>
            <h3>{product.name}</h3>
            <span>{formatCurrency(product.price)}</span>

            </div>
            <div className={styles.count_price}>
            <p>{product.quantity} x</p>
            <BsArrowRightShort size={22}/>
            <h3>{formatCurrency(product.price*product.quantity)}</h3>
          </div>
           </div>
          
          </div>
        ))
      }
    </div>
  )
}

export default MyOrdersItem