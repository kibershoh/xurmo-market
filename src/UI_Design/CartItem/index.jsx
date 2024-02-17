import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { HiMinus } from 'react-icons/hi'
import { MdOutlineDelete } from 'react-icons/md'
import styles  from '../CartItemsStyles/styles.module.scss'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../Redux/slice/cartSlice'
import { RiDeleteBin5Line } from 'react-icons/ri'
const CartItem = ({item,number}) => {
  console.log(item)
    const dispatch = useDispatch()
    const DeleteProduct = ()=>{
         const action = window.confirm('Do you want delete?')
        if(action){
          dispatch(cartActions.deleteProduct(item.id))
        }
      
    }

    const handleIncrement = ()=>{
    dispatch(cartActions.incrementQuantity(item.id))
    }
    const handleDecrement = ()=>{
    dispatch(cartActions.decrementQuantity(item.id))
    }
   
      const title=["ID_:","Image:","Name:","Price:","Quantity:","Total Price:","Action:"]
 
  return (
    <>






           <tr>
    {title.map((label, index) => (
      <td key={index} scope="row" data-label={label}>
        {label==="ID_:"  ? <p>{number + 1}</p> : null}
        {label === "Image:" ? <img src={item.downloadURL} alt="" /> : null}
        {label === "Name:" ? item.name : null}
        {label === "Price:" ? item.price : null}
        {label === "Quantity:" ? ( <div className={styles.plus_minus_btn}>
                <button><GoPlus onClick={handleIncrement} className={styles.plus_icon} size={22}/></button>
                <span>{item.quantity}</span>
                <button><HiMinus onClick={handleDecrement} className={styles.minus_icon}  size={22}/></button>
              </div>) : null}
        {label === "Total Price:" ? item.totalPrice : null}
        {label === "Action:" ? (
          <div onClick={() => { DeleteProduct(item.ID) }} className={styles.delete}>
            <button type="button" className={styles.delete_btn}>
              <span className={styles.btn_text}>Delete</span>
              <span className={styles.btn_icon}>
                <RiDeleteBin5Line size={18} />
              </span>
            </button>
          </div>
        ) : null}
      </td>
    ))}
  </tr>
    </>
  )
}

export default CartItem