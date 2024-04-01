import { TbListDetails, TbNumber } from "react-icons/tb"
import { number, time, toSent } from "../../../Constants/function"
import { formatCurrency } from "../../../Constants/utils/moneyCurrent"
import MyOrdersItem from "../../MyOrdersItem"
import { useNavigate } from "react-router-dom"

const LastOrder = (props) => {
    const { data,styles } = props
    const navigate = useNavigate()
    return (
        <>
            {
                data && data?.length > 0 && (
                    <div>
                        <div className={styles.date_price}>
                            <div className={styles.order_header}>
                                <p>Order <p className={styles.count_order}> #{number(data[data.length - 1]?.countOrders)} </p> at  <h5>{time(data[data.length - 1]?.date)}</h5> </p>
                                <button onClick={() => toSent(data[data.length - 1])}>{data[data.length - 1].sent ? <span className={styles.accepted}>accepted</span> : <span className={styles.sent}>acceptance</span>}</button>
                            </div>
                            <div className={styles.more_information}>
                                <div className={styles.customer_img}>
                                    <p>{data[data.length - 1].user.displayName}</p>
                                     <img  src={data[data.length - 1]?.user.photoURL} alt="" />
                                   </div>
                                <span className={styles.total_price}>Total Price: {formatCurrency(data[data.length - 1]?.orderPrice)}</span>
                                <span>
                                    <TbListDetails onClick={()=>navigate(`/dashboard/order_details/${data[data.length - 1]?.id}`)} size={22} />
                                </span>
                            </div>                            </div>
                        <div className={styles.product_items}>
                            <MyOrdersItem item={data[data.length - 1]} />
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default LastOrder