import React, { useState } from 'react'
import useGetData from '../../../Custom Hooks/UseGetData'
import LoaderTable from '../../../Components/LoaderTable'
import CartItemAdmin from '../../../UI_Design/CartItemAdmin'
import styles from './styles.module.scss'
import { TbNumber } from 'react-icons/tb'
import UseAuth from '../../../Custom Hooks/UseAuth'
import CartItemAdminUsers from '../../../UI_Design/CartItemAdminUsers'
const Users = () => {
  const {data:usersData,loading} = useGetData("users")
  return (
    <>
    <div id='all_products' className={styles.users}>
        {           
          usersData.length === 0 ? <h1 className={styles.dont_add}>{!window.navigator.onLine ? <LoaderTable/>: <span>{!loading ? "Don't added product" : <LoaderTable/>}</span>}</h1>:

          <>
            <div className={styles.overflow_table}>
              <table>
               
                 <thead>
                  <tr>
                    <th><TbNumber size={19} /> </th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Delete</th>
                  </tr>
                </thead>
               
                <tbody>
                  {


                      usersData.map((user, index) => (
                        <CartItemAdminUsers user={user} key={index} number={index} />
                      ))

                  }
                </tbody>
              </table>
            </div>

          </>
        }


      </div>
    </>
  )
}

export default Users