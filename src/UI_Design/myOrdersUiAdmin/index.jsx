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
    const [acceptedData, setAcceptedData] = useState([])
    const [acceptanceData, setAcceptanceData] = useState([])
    const [lastOrder, setLastOrder] = useState([])
    useEffect(() => {
        const AcceptedData = data?.filter((item) => item.sent)
        setAcceptedData(AcceptedData)
        const AcceptanceData = data?.filter((item) => !item.sent)
        setAcceptanceData(AcceptanceData)

    }, [data])

    const LastOrder = ({ data }) => {
        return (
            <>
                {
                    data && data.length > 0 && (
                        <div>
                            <div className={styles.date_price}>
                                <div>
                                    <p>Order <p className={styles.count_order}> <TbNumber size={25} /> {number(data.length)} </p> at  <h5>{time(data[data.length - 1]?.date)}</h5> </p>
                                    <button onClick={() => toSent(data[data.length - 1])}>{data[data.length - 1].sent ? <span className={styles.accepted}>accepted</span> : <span className={styles.sent}>acceptance</span>}</button>
                                </div>
                                <span className={styles.total_price}>Total Price: {formatCurrency(data[data.length - 1]?.orderPrice)}</span>
                            </div>
                            <div className={styles.product_items}>
                                <MyOrdersItem item={data[data.length - 1]} />
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
    const AllAcceptedAcceptanceUI = ({ data }) => {
        return (
            <>
                {
                    data?.map((item, index) => (

                        <div>
                            <div className={styles.date_price}>
                                <div>
                                    <p>Order <p className={styles.count_order}> <TbNumber size={25} /> {number(index + 1)} </p> at  <h5>{time(data[data.length - 1]?.date)}</h5> </p>
                                    <button onClick={() => toSent(item)}>{item.sent ? <span className={styles.accepted}>accepted</span> : <span className={styles.sent}>acceptance</span>}</button>
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
        )
    }
    const EmptyPage = () => {
        return <>
            <div className={styles.empty_orders}>
                <h1>You have not given any orders</h1>
            </div></>
    }

    const tabItems = [
        { id: 1, type: 'last', title: 'New Order' },
        { id: 2, type: 'all', title: 'All Orders' },
        { id: 3, type: 'accepted', title: 'Accepted Orders' },
        { id: 4, type: 'acceptance', title: 'Acceptance Orders' },
    ]

    const TabComponent = ({ tab }) => {
        if (tab === 'last') {
            return <LastOrder data={data} />
        } else if (tab === 'all') {
            return <AllAcceptedAcceptanceUI data={data} />

        } else if (tab === 'accepted') {
            return <AllAcceptedAcceptanceUI data={acceptedData} />

        } else if (tab === 'acceptance') {
            return <AllAcceptedAcceptanceUI data={acceptanceData} />

        }

    }
    const TabButtons = ({ tabItems }) => {
        return (
            <>
                {
                    data && <div className={styles.tab_btn_admin}>
                        {
                            tabItems.map((item) => (
                                <button key={item.id} onClick={() => setTab(item.type)} className={tab === item.type ? styles.active_tab : styles.noActive_tab}>{item.title} </button>

                            ))
                        }
                    </div>
                }
            </>
        )
    }
    return (
        <>
            {
                currentUser && data.length !== 0 ?

                    <div className={styles.my_orders}>
                        <TabButtons tabItems={tabItems} />
                        
                        <TabComponent tab={tab} />
                    </div>
                    :
                    <EmptyPage />
            }
        </>
    )
}

export default MyOrdersUiAdmin