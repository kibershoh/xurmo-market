import React from 'react'
import { useState } from 'react'
import styles from '../myOrdersUi/styles.module.scss'
import { AllAcceptedAcceptanceUI } from './components/allAcceptedAcceptanceUi'
import LastOrder from './components/lastOrder'
import { useMemo } from 'react'
const MyOrdersUiAdmin = (props) => {
    const { currentUser, data } = props
    const [tab, setTab] = useState('last')
    const acceptedData = useMemo(() => {
        return data?.filter((item) => item.sent) || [];
    }, [data]);

    const acceptanceData = useMemo(() => {
        return data?.filter((item) => !item.sent) || [];
    }, [data]);
    console.log(acceptanceData);
    console.log(acceptedData);
    console.log(data);
   
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
            return <LastOrder styles = {styles} data={data} />
        } else if (tab === 'all') {
            return <AllAcceptedAcceptanceUI styles={styles} data={data} />

        } else if (tab === 'accepted') {
            return <AllAcceptedAcceptanceUI styles={styles} data={acceptedData} />

        } else if (tab === 'acceptance') {
            return <AllAcceptedAcceptanceUI styles={styles} data={acceptanceData} />

        }

    }
    const TabButtons = ({ tabItems }) => {
        return (
            <>
                {
                    data && <div className={styles.tab_btn_admin}>
                        {
                            tabItems?.map((item,index) => (
                                <button key={index} onClick={() => setTab(item?.type)} className={tab === item.type ? styles.active_tab : styles.noActive_tab}>{item.title} </button>

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