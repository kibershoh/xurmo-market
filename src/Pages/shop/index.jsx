import React, { useEffect, useState } from 'react'

// ~~~~~~~~~React Icons~~~~~~~~~//
import { MdOutlineSearch } from "react-icons/md";

// ~~~~~~~~~Components~~~~~~~~//
import TotalSection from '../../UI_Design/TotalSection'
import { ProductList } from '../../UI_Design';
import styles from './styles.module.scss'

// ~~~~~~~~~Data~~~~~~~~~~//
import Select from '../../UI_Design/SelectOption';
import useGetData from '../../Custom Hooks/UseGetData';
import CardLoader from '../../Constants/LoaderCard';

const Shop = () => {
  const { data: products, loading } = useGetData("products")

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~States ~~~~~~~~~~~~~~~~~~~//
  const [inputText, setInputText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState({});

  useEffect(() => {
    if (products) {
      const categories = [...new Set(products.map(product => product.category))];
      setCategories(categories);
      const categorizedProducts = categories.reduce((arr, category) => {
        arr[category] = products.filter(product => product.category === category);
        return arr;
      }, {});
      setFilteredProducts(categorizedProducts);
    }
  }, [products]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setInputText(searchTerm)
    const searchProducts = products.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchedProducts(searchProducts)

  }
  const emptySearchInput = ()=>{
    setInputText('')
  }
   return (
   <>
      <TotalSection />
    <div className={styles.shop}>
      <div className={styles.shop_header}>
        <div className={styles.search_product}>
          <MdOutlineSearch size={22} className={styles.search_icon} />
          <input value={inputText} type="text" placeholder='Search....' className={styles.search_input}
            onChange={handleSearch}
          />
        </div>
        <div className={styles.filter_product}>
          <Select value={selectedCategory} categories={categories} handleFilter={handleCategoryChange} click = {emptySearchInput} />
        </div>
      </div>
      <div className={styles.all_products}>

         
        {
          inputText === '' ?
            ((loading && window.navigator.onLine) ? <CardLoader /> : (

              (selectedCategory === '' && inputText === '') ? <ProductList data={products} /> : 
                (<ProductList data={filteredProducts[selectedCategory]} />)
            )) :
            (
              (searchedProducts.length === 0 ? <h1 className={styles.empty_product}>This product is not available</h1>: <ProductList data={searchedProducts}/>)
            )
        }
        {

        }
      </div>




    </div>
   </>
  )
}

export default Shop