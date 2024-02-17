import React from 'react'
// ~~~~~~~~~~~Hooks~~~~~~~~~~~//
import { Link } from 'react-router-dom';
// ~~~~~~~~~~~ React icons ~~~~~~~~~~~//
import { TbNumber } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";

// ~~~~~~~~~~~Redux~~~~~~~~~~~//
import { useSelector } from 'react-redux';

// ~~~~~~~~~~~Components~~~~~~~~~~~//
import CartItem from '../../UI_Design/CartItem';
import styles from './styles.module.scss'
import { formatCurrency } from '../../Constants/utils/moneyCurrent';
const Cart = () => {

  // ~~~~~~ Redux datas ~~~~~~~~~~//
  const productItems = useSelector(state => state.cart.cartItems)
  const totalAmout = useSelector(state => state.cart.totalAmout)
  return (
    <>
      <div id='cart' className={styles.cart}>
        {
          productItems.length === 0 ? 
            <h1 className={styles.no_product}>No product added to cart</h1>
           :           
              <>
                <div className={styles.overflow_table}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col"><TbNumber size={19} /> </th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        productItems.map((item, index) => (
                          <CartItem item={item} key={index} number={index} />
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <div className={styles.total_price}>
                  <div className={styles.all_price}>
                    <h1>Product price</h1>
                    <span>{formatCurrency(totalAmout)}</span>
                  </div>
                  <p>If you want to buy, you can pay by card. Payments are made safely with us.</p>
                  <div className={styles.checkout_btn}>
                    <Link to={'/checkout'}>Checkout</Link>
                    <Link to={'/shop'}>Continue Shopping <FaArrowRightLong className={styles.right_icon} /></Link>
                  </div>
                </div>
              </>
            }
      </div>
    </>
  )
}

export default Cart