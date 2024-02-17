import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// ~~~~~~~~~React Icons~~~~~~~~~//
import { MdOutlineSearch } from "react-icons/md";

// ~~~~~~~~~Components~~~~~~~~//
import TotalSection from '../../UI_Design/TotalSection'
import { ProductList } from '../../UI_Design';
import styles from './styles.module.scss'

// ~~~~~~~~~Data~~~~~~~~~~//
// import products from '../../Constants/data/products'
import Select from '../../UI_Design/SelectOption';
import useGetData from '../../Custom Hooks/UseGetData';
import CardLoader from '../../Constants/LoaderCard';

const Shop = () => {
  const {data:products,loading} = useGetData("products")
  const [allProducts,setAllProducts] = useState(products)
  const [productsData,setProductsData] = useState(products)
  const [inputText,setInputText] = useState('')
  const navigate = useNavigate()
 
  const handleFilter = (e)=>{
    const filterValue = e.target.value;
    if(filterValue==='all'){
      
      setProductsData(products)
    }
    else if(filterValue==='micraphone'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'micraphone'
      )
      setProductsData(filteredProducts)
    }
    else if(filterValue==='mobile'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'mobile'
      )
      setProductsData(filteredProducts)
    }
    else if(filterValue==='mouse'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'mouse'
      )
      setProductsData(filteredProducts)
    }
    else if(filterValue==='wireless'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'wireless'
      )
      setProductsData(filteredProducts)
    }
    else if(filterValue==='watch'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'watch'
      )
      setProductsData(filteredProducts)
    }
    else if(filterValue==='guitar'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'guitar'
      )
      setProductsData(filteredProducts)
    }
    else if(filterValue==='wireless'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'wireless'
      )
      setProductsData(filteredProducts)
    }
    
  } 
   const handSearch = (e)=>{
    const searchTerm = e.target.value;
    setInputText(searchTerm)
    const searchedProducts = products.filter(item => item.name.toLowerCase().includes(searchTerm))
    setProductsData(searchedProducts)
    
  }  
  
 
  return (
    <div className={styles.shop}>
      <TotalSection title={"Products"}/>
     <div className={styles.shop_header}>
       <div className={styles.filter_product}>
       
        <Select handleFilter={handleFilter}/>

       
      </div>
      <div className={styles.search_product}>
        <MdOutlineSearch size={22} className={styles.search_icon}/>
         <input type="text" placeholder='Search....' className={styles.search_input} 
         onChange={handSearch}
         />
      </div>
     </div>
     <div>
     
      {
        (loading && window.navigator.onLine) ? <CardLoader/>:(

          (productsData.length === 0 && inputText==='')  ? <ProductList data={products}/>:
         ((productsData.length === 0 && inputText!=='')? <h1>Mavjud emas</h1>: <ProductList data={productsData}/>) 
        )
     }
     </div>
    </div>
  )
}

export default Shop