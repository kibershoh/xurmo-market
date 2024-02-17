import React, { useEffect, useState } from 'react'
import useGetData from '../../Custom Hooks/UseGetData';
import { useParams } from 'react-router-dom';

const Contact = () => {
  const {id} = useParams()
      const {data:products,loading} = useGetData("products")
 const [product, setProduct] = useState([])


console.log(products);

 useEffect( () => {
    if (loading) {
      const foundProduct = products.find(item => item.ID === id);
      setProduct(foundProduct);
    }
    
  }, [id,products]); 
  console.log(product); 
   return (
    <div>Contact</div>
  )
}

export default Contact