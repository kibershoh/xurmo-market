import React from 'react'
import AddProduct from '../Add_Product'
import styles from './styles.module.scss'
import clsx from 'clsx'
const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
        <div  className={clsx(
          styles.service,styles.green
        )} >
           
                <p>Total Sales</p>
                <h2>$3400</h2>
        </div>
        <div  className={clsx(
          styles.service,styles.yellow
        )} >
           
                <p>Orders</p>
                <h2>400</h2>
        </div>
        <div  className={clsx(
          styles.service,styles.red
        )} >
           
                <p>Total products</p>
                <h2>7</h2>
        </div>
        <div  className={clsx(
          styles.service,styles.blue
        )} >
           
                <p>Total Users</p>
                <h2>9</h2>
        </div>
    </div>
  )
}

export default Dashboard