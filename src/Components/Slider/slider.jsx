import React, { useEffect } from 'react'
import styles from './style.module.scss'
import useGetData from '../../Custom Hooks/UseGetData'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiSearchAlt2 } from 'react-icons/bi'
import { IoSearchOutline } from 'react-icons/io5'
import clsx from 'clsx'
import { useScroll } from '../Navbar/useScroll'

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
  const [color, setColor] = useState(false);

    const changeColor = () => {
        if (window.scrollY >= 350) {
            setColor(true)
        }
        else {
            setColor(false);
        }
    };
    useEffect(()=>{
      window.addEventListener("scroll", changeColor);
      
    },[scrollY])
    


    return (
    <div className={styles.slider}>
      <div className={clsx(
        styles.search_input,
          color ? styles.fixed : '',
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