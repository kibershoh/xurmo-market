import React, { useEffect } from 'react'
import styles from './style.module.scss'
import useGetData from '../../Custom Hooks/UseGetData'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiSearchAlt2 } from 'react-icons/bi'
import { IoSearchOutline } from 'react-icons/io5'
import clsx from 'clsx'
import { useScroll } from '../Navbar/useScroll'

const Header = () => {
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
  const [fixed, setFixed] = useState(false);

    const changeFixed = () => {
        if (window.scrollY >= 350) {
            setFixed(true)
        }
        else {
            setFixed(false);
        }
    };
    useEffect(()=>{
      window.addEventListener("scroll", changeFixed);
      
    },[scrollY])
    


    return (
    <div className={styles.header}>
       <div className={styles.waves}>
        <div className={clsx(styles.wave1, styles.wave)}> </div>
        <div className={clsx(styles.wave2, styles.wave)}> </div>
        <div className={clsx(styles.wave3, styles.wave)}> </div>
        <div className={clsx(styles.wave4, styles.wave)}> </div>
      </div>

    </div>
  )
}

export default Header