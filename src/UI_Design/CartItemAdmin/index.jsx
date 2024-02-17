import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { HiMinus } from 'react-icons/hi'
import { MdOutlineDelete } from 'react-icons/md'
import styles from '../CartItemsStyles/styles.module.scss'
import { useDispatch } from 'react-redux'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { cartActions } from '../../Redux/slice/cartSlice'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../Firebase/config'
import { TbNumber, TbNumber0 } from 'react-icons/tb'
const CartItemAdmin = ({ item, number }) => {
    


 const deleteProduct = async (id)=>{
    await deleteDoc(doc(db, "products",id))
    
  }

const title=["ID_:","Image:","Name:","Category:","Price:","Action:",]
    
    return (
       <tr>
    {title.map((label, index) => (
      <td key={index} scope="row" data-label={label}>
        {label==="ID_:"  ? <p>{number + 1}</p> : null}
        {label === "Image:" ? <img src={item.downloadURL} alt="" /> : null}
        {label === "Name:" ? item.name : null}
        {label === "Category:" ? item.category : null}
        {label === "Price:" ? item.price : null}
        {label === "Action:" ? (
          <div onClick={() => { deleteProduct(item.id) }} className={styles.delete}>
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
         
    )
}

export default CartItemAdmin