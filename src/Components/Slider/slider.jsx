import React from 'react'
import styles from './style.module.scss'
import useGetData from '../../Custom Hooks/UseGetData'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiSearchAlt2 } from 'react-icons/bi'
import { IoSearchOutline } from 'react-icons/io5'

const Slider = () => {
const {data:productsData,loading} = useGetData("products")
console.log(productsData);
const [data,setData] = useState([])
const [inputText,setInputText] = useState('')

const handleSearch = (e)=>{
    const searchTerm = e.target.value;
    const searchedProducts = productsData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setData(searchedProducts)
    setInputText(searchTerm)
    
  } 
  console.log(data);
    return (
    <div className={styles.slider}>
      <div className={styles.search_input}>
         <div className={styles.input_box}>
            <input placeholder='Search Products....' onChange={handleSearch} type="search" /> 
        <IoSearchOutline size={22} className={styles.search_btn}/>
         </div>
     {
        inputText !=='' && data.length !==0 && 
         <div className={styles.searched_products}>
            
            <div className={styles.names}>
            {
          inputText &&  data?.map((item,index)=>(
                <Link to={/shop/ + item.ID}><BiSearchAlt2 size={20}/> <span>{item.name}</span></Link>
            ))
        }
        </div>
      </div>
     }
      </div>
    </div>
  )
}

export default Slider