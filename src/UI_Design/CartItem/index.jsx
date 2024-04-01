import React from 'react'
import { GoPlus } from 'react-icons/go'
import { HiMinus } from 'react-icons/hi'
import styles from '../CartItemsStyles/styles.module.scss'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../Redux/slice/cartSlice'
import { RiDeleteBin5Line } from 'react-icons/ri'
import CartSlider from '../../Pages/cart/slider'

const CartItem = ({ item, number }) => {
  const dispatch = useDispatch()



  // ~~~~~~~~~~Functions ~~~~~~~~~~~~~~//
  const DeleteProduct = () => {
    const action = window.confirm('Do you want delete?')
    if (action) {
      dispatch(cartActions.deleteProduct(item.id))
    }

  }

  const handleIncrement = () => {
    dispatch(cartActions.incrementQuantity(item.id))
  }
  const handleDecrement = () => {
    dispatch(cartActions.decrementQuantity(item.id))
  }

  const title = ["", "Name:", "Price:", "Quantity:", "Total Price:", "Action:"]
  return (
    <>
      <tr>
        {title.map((label, index) => (
          <td key={index} scope="row" data-label={label}>
            {label === "" ? <>
              <CartSlider images={item?.images} />
            </> : null}
            {label === "Name:" ? item.name : null}
            {label === "Price:" ? item.price : null}
            {label === "Quantity:" ? (<div className={styles.plus_minus_btn}>
              <button><GoPlus onClick={handleIncrement} className={styles.plus_icon} size={22} /></button>
              <span>{item.quantity}</span>
              <button><HiMinus onClick={handleDecrement} className={styles.minus_icon} size={22} /></button>
            </div>) : null}
            {label === "Total Price:" ? item.totalPrice : null}
            {label === "Action:" ? (
              <div onClick={() => { DeleteProduct(item.ID) }} className={styles.delete_product}>
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