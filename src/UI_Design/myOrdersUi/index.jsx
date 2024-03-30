import React from 'react'
import MyOrdersItem from '../MyOrdersItem'
import { formatCurrency } from '../../Constants/utils/moneyCurrent'
import { deleteOrder, number, time } from '../../Constants/function'
import styles from './styles.module.scss'
import { useState } from 'react'
import { TbNumber } from 'react-icons/tb'
import { AiOutlineDelete } from 'react-icons/ai'
const MyOrdersUi = (props) => {
  const { currentUser, data } = props
  const [tab, setTab] = useState('last')
  return (
    <>
      {
        currentUser && data.length !==0 ? <div className={styles.my_orders}>
          {
            data && <div className={styles.tab_btn}>
              <button onClick={() => setTab('last')} className={tab === 'last' ? styles.active_tab : styles.noActive_tab}>Last Order </button>
              <button onClick={() => setTab('all')} className={tab === 'all' ? styles.active_tab : styles.noActive_tab}>All Order</button>

            </div>
          }
          {

            tab === 'last' ?
            
              // Last Order
              <>
                {
                  data && data.length > 0 && (
                    <div>
                      <div className={styles.date_price}>
                        <div>
                          <p>Order <p className={styles.count_order}> <TbNumber size={25} /> {number(data.length)} </p> at  <h5>{time(data[data.length - 1]?.date)}</h5> </p>
                          <span className={styles.first_span}>{data[data.length - 1]?.sent ? <span className={styles.accepted}>accepted</span> : <span className={styles.sent}>sent</span>}</span><AiOutlineDelete size={22} onClick={() => deleteOrder(data[data.length - 1]?.id)} className={styles.delete_order} />
                        </div>
                        <span className={styles.total_price}>Total Price: {formatCurrency(data[data.length - 1]?.orderPrice)}</span>
                      </div>
                      <div className={styles.product_items}>
                        <MyOrdersItem item={data[data.length - 1]} />
                      </div>
                    </div>
                  )
                }
              </> :
              // All Orders
              <>
                {
                  data?.map((item, index) => (

                    <div>
                      <div className={styles.date_price}>
                        <div>
                          <p>Order <p className={styles.count_order}> <TbNumber size={25} /> {number(index + 1)} </p> at  <h5>{time(data[data.length - 1]?.date)}</h5> </p>
                          <span className={styles.first_span}>{item.sent ?<span className={styles.accepted}>accepted</span> : <span className={styles.sent}>sent</span>}</span><AiOutlineDelete size={22} onClick={() => deleteOrder(item.id)} className={styles.delete_order} />
                        </div>

                        <span className={styles.total_price}>Total Price: {formatCurrency(item?.orderPrice)}</span>
                      </div>
                      <div className={styles.product_items}>
                        <MyOrdersItem item={item} />
                      </div>

                    </div>

                  ))
                }

              </>
          }



        </div> :
          <div className={styles.empty_orders}>
            <h1>You have not given any orders</h1>
          </div>
      }
    </>
  )
}

export default MyOrdersUi