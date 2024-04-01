import React from 'react'
import styles from './styles.module.scss'
import useGetData from '../../Custom Hooks/UseGetData'
import { useEffect } from 'react'
import { useState } from 'react'
import UseAuth from '../../Custom Hooks/UseAuth'
import { ProductList } from '../../UI_Design'
const LikedProducts = () => {
  const {data:productsData} = useGetData("products")
  const [likedData,setLikedData] = useState([])
  const {currentUser} = UseAuth()
  useEffect(()=>{
 if (productsData && currentUser) {
      const filterLiked = productsData.filter(item => item.likeCount.includes(currentUser.displayName))
      setLikedData(filterLiked)
    }
  },[productsData])
  console.log(likedData);
  return (
    <div className={styles.liked_products}>
      {
        likedData.length !==0 ?
        <>
        {
           currentUser  ?
        <ProductList data={likedData}/>
        :
        <div className={styles.not_liked}>
          <h1>You don't liked!</h1>
        </div>
        }
        </>
        :
        <div className={styles.not_liked}>
          <h1>You don't liked!</h1>
        </div>
       
      }

    </div>
  )
}

export default LikedProducts