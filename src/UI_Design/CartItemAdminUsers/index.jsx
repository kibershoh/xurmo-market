import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { HiMinus } from 'react-icons/hi'
import { MdOutlineDelete } from 'react-icons/md'
import styles from '../CartItemsStyles/styles.module.scss'
import { useDispatch } from 'react-redux'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { cartActions } from '../../Redux/slice/cartSlice'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db, storage } from '../../Firebase/config'
const CartItemAdminUsers = ({ user, number }) => {
       
 const deleteUsers =  (id)=>{
     deleteDoc(doc(db, "users",id))
    
  }


    return (
        <tr>
            <td>
                <p>{number + 1} </p>
            </td>
            <td>
                <img src={user.photoURL} alt="" />
            </td>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>
                <div onClick={()=>{deleteUsers(user.uid)}} className={styles.delete}>
                    <button type="button" className={styles.delete_btn}>
                        <span className={styles.btn_text}>Delete</span>
                        <span className={styles.btn_icon}>
                            <RiDeleteBin5Line size={18} />
                        </span>
                    </button>
                </div>

            </td>


        </tr>
    )
}

export default CartItemAdminUsers