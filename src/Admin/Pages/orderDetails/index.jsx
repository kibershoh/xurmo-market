import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

// ~~~~~~~~~~~Components~~~~~~~~~// 
import { time, toSent } from '../../../Constants/function'
import useGetData from '../../../Custom Hooks/UseGetData'
import { formatCurrency } from '../../../Constants/utils/moneyCurrent'


// ~~~~~~~~~~~Libraries~~~~~~~~~// 
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import clsx from 'clsx'


// ~~~~~~~~~~~React Icons~~~~~~~~~// 
import { BsArrowLeft, BsQuestionSquare } from 'react-icons/bs'
import { LuCopy } from 'react-icons/lu'


const OrderDetails = () => {
    const { data: orders } = useGetData("orders")
    const { id } = useParams()
    const [data, setData] = useState([])
    const [moreTExt, setMoreTExt] = useState(false)
    const MoreText = () => {
        setMoreTExt(!moreTExt)
    }
    const navigate = useNavigate()
    useEffect(() => {
        const newData = orders.filter((item) => item.id === id)
        setData(newData)
    }, [orders])
    console.log(data);
    const hideCardNumber = (number) => {
        const toString = number.toString()
        return toString.substring(0, 4) + '**** ****' + toString.substring(12)
    }
    const questionsText = (text) => {
        return text.substring(0, 100)
    }
    const copyCardNUmber = (number) => {
        toast.success("Copied!")
        return navigator.clipboard.writeText(number)
    }
    return (
        <div className={styles.order_details}>

            {
                data?.map((item) => (
                    <div key={item.id}>
                        <div className={styles.accept}>
                            <div className={styles.back_btn}>
                                <button onClick={() => navigate('/dashboard/order-lists')}>
                                    <BsArrowLeft /> <span>Back to Order List</span>
                                </button>
                            </div>
                            <div>
                             <button className={styles.accept_btn} onClick={() => toSent(item)}>{item.sent ? <span className={styles.accepted}>accepted</span> : <span className={styles.sent}>acceptance</span>}</button>

                            </div>
                        </div>
                        <div className={styles.customer}>
                            <div className={styles.customer_information}>
                                <div className={styles.customer_billing}>
                                    <h2>Full Name</h2>
                                    <p>{item.firstName} {item.lastName}</p>
                                </div>
                                <div className={styles.customer_billing}>
                                    <h2>Email</h2>
                                    <p>{item.email}</p>
                                </div>
                                <div className={styles.customer_billing}>
                                    <h2>Phone</h2>
                                    <p>{item.phone}</p>
                                </div>
                                <div className={styles.customer_billing}>
                                    <h2>Adress</h2>
                                    <p>{item.adress}</p>
                                </div>
                                <div className={styles.customer_billing}>
                                    <h2>Place</h2>
                                    <p>{item.country},{item.region}</p>
                                </div>


                            </div>
                            <div className={styles.customer_information}>


                                <div className={styles.customer_billing}>
                                    <h2>Total Price</h2>
                                    <p>{formatCurrency(item.orderPrice)}</p>
                                </div>
                                <div className={styles.customer_billing}>
                                    <h2>Date</h2>
                                    <p>{time(item.date)}</p>
                                </div>
                                <div className={styles.customer_billing}>
                                    <h2>Postal Code</h2>
                                    <p>{item.postalCode}</p>
                                </div>
                                <div className={styles.customer_billing}>
                                    <h2>Card billing</h2>
                                    <p>
                                        <span className={styles.card_number}>
                                            {hideCardNumber(item?.creditCard.cardNumber)}
                                            <button onClick={() => copyCardNUmber(item?.creditCard.cardNumber)}>
                                                <LuCopy className={styles.copy_card_number} size={18} />
                                            </button>
                                        </span>
                                        <br />

                                        <span className={styles.fullName_card}>
                                            {item?.creditCard.fullName}
                                        </span>
                                    </p>
                                </div>
                                <div className={styles.questions}>
                                    <h2>
                                        <span>Questions</span>
                                        {item?.questions && <BsQuestionSquare size={20} />}
                                    </h2>
                                    <p className={clsx(
                                        moreTExt ? styles.hide : styles.show
                                    )}>{questionsText(item?.questions)} <span onClick={MoreText}>more</span></p>
                                    <p className={clsx(
                                        moreTExt ? styles.show : styles.hide
                                    )}>{item?.questions}</p>
                                </div>


                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default OrderDetails