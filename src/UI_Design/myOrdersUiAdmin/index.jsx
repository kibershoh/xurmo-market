import React from 'react'
import MyOrdersItem from '../MyOrdersItem'
import { formatCurrency } from '../../Constants/utils/moneyCurrent'
import { deleteOrder, number, time, toSent } from '../../Constants/function'
import { useState } from 'react'
import { TbNumber } from 'react-icons/tb'
import { AiOutlineDelete } from 'react-icons/ai'
import styles from '../myOrdersUi/styles.module.scss'
import { useEffect } from 'react'
const MyOrdersUiAdmin = (props) => {
  const { currentUser, data } = props
  const [tab, setTab] = useState('last')
  const [acceptedData,setAcceptedData] = useState([])
  useEffect(()=>{
    const AcceptedData = data?.filter((item)=>item.sent === true)
    setAcceptedData(AcceptedData)
  },[data])
  console.log(acceptedData);
  return (
    <>
      {
        currentUser && data.length !==0 ? <div className={styles.my_orders}>
          {
            data && <div className={styles.tab_btn}>
              <button onClick={() => setTab('last')} className={tab === 'last' ? styles.active_tab : styles.noActive_tab}>New Order </button>
              <button onClick={() => setTab('all')} className={tab === 'all' ? styles.active_tab : styles.noActive_tab}>All Order</button>
              <button onClick={() => setTab('accepted')} className={tab === 'accepted' ? styles.active_tab : styles.noActive_tab}>Accepted Order</button>

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
                          <button onClick={()=>toSent(data[data.length - 1])}>{data[data.length - 1].sent ? <span className={styles.accepted}>accepted</span> : <span className={styles.sent}>acceptance</span>}</button>
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
                  tab === 'all' ?  
                  data?.map((item, index) => (

                    <div>
                      <div className={styles.date_price}>
                        <div>
                          <p>Order <p className={styles.count_order}> <TbNumber size={25} /> {number(index + 1)} </p> at  <h5>{time(data[data.length - 1]?.date)}</h5> </p>
                          <button onClick={()=>toSent(item)}>{item.sent ? <span className={styles.accepted}>accepted</span> : <span className={styles.sent}>acceptance</span>}</button>
                        </div>

                        <span className={styles.total_price}>Total Price: {formatCurrency(item?.orderPrice)}</span>
                      </div>
                      <div className={styles.product_items}>
                        <MyOrdersItem item={item} />
                      </div>

                    </div>

                  ))
                  :
                  acceptedData.length !==0 ?  acceptedData?.map((item, index) => (

                    <div>
                      <div className={styles.date_price}>
                        <div>
                          <p>Order <p className={styles.count_order}> <TbNumber size={25} /> {number(index + 1)} </p> at  <h5>{time(data[data.length - 1]?.date)}</h5> </p>
                          <button onClick={()=>toSent(item)}>{item.sent ? <span className={styles.accepted}>accepted</span> : <span className={styles.sent}>acceptance</span>}</button>
                        </div>

                        <span className={styles.total_price}>Total Price: {formatCurrency(item?.orderPrice)}</span>
                      </div>
                      <div className={styles.product_items}>
                        <MyOrdersItem item={item} />
                      </div>

                    </div>

                  ))
                  :
                  <p>You have not accepted order!</p>
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

export default MyOrdersUiAdmin