

// ~~~~~~~~~~~~~ React Hooks~~~~~~~~~~~~~//
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ~~~~~~~~~~~~~ Styles~~~~~~~~~~~~~//
import styles from './styles.module.scss'

// ~~~~~~~~~~~~~ Components~~~~~~~~~~~~~//
import { LoaderTable } from '../../../Components'
import CartItemAdmin from '../../../UI_Design/CartItemAdmin'

// ~~~~~~~~~~~~~ React Icons~~~~~~~~~~~~~//
import { FiPlus } from 'react-icons/fi'
import { TbNumber } from 'react-icons/tb'

// ~~~~~~~~~~~~~ Datas ~~~~~~~~~~~~~//
import useGetData from '../../../Custom Hooks/UseGetData'

const AllProducts = () => {

  const { data: productsData, loading } = useGetData("products")
  const [newData,setNewData] = useState([])
 useEffect(()=>{
  const filteredData = productsData?.sort((a, b) => b.date - a.date)
  setNewData(filteredData)
 },[productsData])
  return (
    <>

      <div id='all_products' className={styles.all_products}>
        <div className={styles.add_product_btn}>
          <button><Link to={'/dashboard/add-products'}> <span>Add product</span> <FiPlus className={styles.fiPlus} size={22} /></Link></button>

        </div>
        {
          newData.length === 0 ? <h1 className={styles.dont_add}>{!window.navigator.onLine ? <LoaderTable /> : <span>{!loading ? "Don't added product" : <LoaderTable />}</span>}</h1> :

            <>

              <div className={styles.overflow_table}>
                <p>Total products: {newData.length}</p>
                <table>

                  <thead>
                    <tr>
                      {/* <th scope="col"><TbNumber size={19} /> </th> */}
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {


                      newData?.map((item, index) => (
                        <CartItemAdmin item={item} key={index} number={index} />
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

export default AllProducts