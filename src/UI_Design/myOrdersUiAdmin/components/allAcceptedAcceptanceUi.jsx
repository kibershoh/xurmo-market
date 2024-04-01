import { TbListDetails } from "react-icons/tb"
import { number, time, toSent } from "../../../Constants/function"
import { formatCurrency } from "../../../Constants/utils/moneyCurrent"
import MyOrdersItem from "../../MyOrdersItem"
import { useNavigate } from "react-router-dom"
export const AllAcceptedAcceptanceUI = (props) => {
    const { data, styles } = props
    const navigate = useNavigate()
     
console.log(data);
    return (
        <>
           
            {
               data.length !==0 ? 
               data?.map((item, index) => (

                        <div key={index}>
                            <div className={styles.date_price}>
                                <div className={styles.order_header}>
                                    <p>Order <p className={styles.count_order}> #{number(item?.countOrders)} </p> at  <h5>{time(item?.date)}</h5> </p>
                                    <button onClick={() => toSent(item)}>{item.sent ? <span className={styles.accepted}>accepted</span> : <span className={styles.sent}>acceptance</span>}</button>
                                </div>

                                <div className={styles.more_information}>
                                   <div className={styles.customer_img}>
                                    <p>{item.user.displayName}</p>
                                     <img  src={item.user.photoURL} alt="" />
                                   </div>
                                    <span className={styles.total_price}>Total Price: {formatCurrency(item?.orderPrice)}</span>
                                    <span>
                                        <TbListDetails onClick={()=>navigate(`/dashboard/order_details/${item?.id}`)} size={22} />
                                    </span>
                                </div>
                            </div>
                            <div className={styles.product_items}>
                                <MyOrdersItem item={item} />
                            </div>

                        </div>

                ))
                :
                <h2 style={{marginTop:'20px',textAlign:'center'}}>No accepted order available!</h2>
            }
        </>
    )
}