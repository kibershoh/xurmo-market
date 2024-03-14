import React, { useState } from 'react'
import styles from './styles.module.scss'
import { IoSearchOutline } from 'react-icons/io5'
import clsx from 'clsx'
import useGetData from '../../Custom Hooks/UseGetData'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Link } from 'react-router-dom'
const SearchInput = () => {
    const {data:productsData,loading} = useGetData("products")
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
    <>
 <div className={clsx(
        styles.search_input,
          
        )}>
         <div className={clsx(
           
          styles.input_box
         )}>
            <input placeholder='Search Products....' onChange={handleSearch} type="search" /> 
        <IoSearchOutline size={20} className={styles.search_btn}/>
         </div>
     {
        inputText !=='' && data.length !==0 && 
         <div className={styles.searched_products}>
            
            <div className={styles.names}>
            {
          inputText &&  data?.map((item,index)=>(
                <Link to={/shop/ + item.ID}><BiSearchAlt2 size={20}/> <span onClick={()=>setInputText('')}>{item.name}</span></Link>
            ))
        }
        </div>
      </div>
     }
      </div>
    </>
  )
}

export default SearchInput