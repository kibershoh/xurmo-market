
  import React from 'react'
  // ~~~~~~~~~Hooks~~~~~~~~//
  // ~~~~~~~~~Components~~~~~~~~//
  import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../Constants/utils/moneyCurrent'
  // ~~~~~~~~~Components~~~~~~~~//
  // ~~~~~~~~~Components~~~~~~~~//
  // ~~~~~~~~~Components~~~~~~~~//
  const Checkout = () => {
    const totalQty = useSelector(state=>state.cart.totalQuantity)
    const totalAmout = useSelector(state=>state.cart.totalAmout)
   const shippingPrice = useSelector(state=>state.cart.shippingPrice)
  
    return (
  <div className={styles.checkout}>
    
     <form>
      <h1>Billing information</h1>
      <div className={styles.inputs}>
        <label> Enter your Name </label>

          <input type="text" placeholder="Name" name="text" />
      </div>
      <div className={styles.inputs}>
        <label> Enter your Email </label>

          <input type="text" placeholder="Email" name="text" />
      </div>
      <div className={styles.inputs}>
        <label> Enter phone number </label>

          <input type="text" placeholder="Phone Number" name="text" />
      </div>
      <div className={styles.inputs}>
        <label> Street adress </label>

          <input type="text" placeholder="Adress" name="text" />
      </div>
      <div className={styles.inputs}>
        <label> Enter your City </label>

          <input type="text" placeholder="City" name="text" />
      </div>
      <div className={styles.inputs}>
        <label> Postal code </label>

          <input type="text" placeholder="Postal code" name="text" />
      </div>
      <div className={styles.inputs}>
        <label> Country </label>

          <input type="text" placeholder="Country" name="text" />
      </div>
    </form>
    <div className={styles.pay_details}>
        <div className={styles.price}>
        <h4>Count of products:</h4><span>{totalQty}</span>

        </div>
        <div className={styles.price}>
        <h4>All orders price: </h4>
        <span>{formatCurrency(totalAmout)}</span>

        </div>
        <div className={styles.price}>
        <h4>Shipping:  </h4>
        <span>{formatCurrency(shippingPrice)}</span>

        </div>
        <div className={styles.price}>
        <h1>Total Cost: </h1>
        <span>{formatCurrency(totalAmout+shippingPrice)}</span>

        </div>
    </div>
  </div>
  )
  } 
  

  export default Checkout
