import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

// --------React Icons -----------//
import { IoStarSharp } from "react-icons/io5";
import { LuPlus } from 'react-icons/lu';

// --------Library-------//
import { toast } from 'react-toastify';
import { Box, Rating, Tab } from '@mui/material';
import { motion } from 'framer-motion'
import StarIcon from '@mui/icons-material/Star';

// ----------Components----------//
import { formatCurrency } from '../../Constants/utils/moneyCurrent';
import styles from './styles.module.scss'
import ProductList from '../../UI_Design/ProductList';

// -------------Data-------------//

// -----------Redux----------//
import { cartActions } from '../../Redux/slice/cartSlice';
import useGetData from '../../Custom Hooks/UseGetData';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FiPlus } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { HiMinus } from 'react-icons/hi';
import { BsEyeFill } from 'react-icons/bs';




const ProductDetails = () => {
  const { data: products, loading } = useGetData("products")
  const { id } = useParams()
  const [product, setproduct] = useState({})
  useEffect(() => {
    if (!loading) {
      const foundProduct = products.find((item) => item.ID === id);
      setproduct(foundProduct);
    }
  }, [id, products]);

  const { ID, price, description, images, name, category, shortDesc, reviews, dateExample, likeCount,viewCount } = product

  // ----------States -----------//
  const [tab, setTab] = useState('reviews')


  const categoryData = products.filter((item) => {
    return item.category === product.category && item.ID !== product.ID;
  })
 
  const dispatch = useDispatch()


  // -------------Functions---------//
  
  const addToCart = () => {
    dispatch(cartActions.addProduct({
      id: product.ID,
      images: product.images,
      name: product.name,
      price: product.price,
    }))
  }

  

  // ~~~~~~~~~~ Description Tab~~~~~~~~~~~~~//
  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleIncrement = () => {
    dispatch(cartActions.incrementQuantity(ID))
  }
  const handleDecrement = () => {
    dispatch(cartActions.decrementQuantity(ID))
  }
  const productItems = useSelector(state => state.cart.cartItems)
   
  const productItem = productItems.filter((item)=>{
    return item.id === ID
  })

  return (
    <>

      <div id='shop_detail' className={styles.details}>
        <div className={styles.product_details}>
          <div className={styles.product_detail}>
            <div className={styles.detailAdmin}>
              <Box sx={{ display: 'flex' }}>
                <TabContext value={value} >
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                      orientation='vertical'
                      onChange={handleChange} aria-label="lab API tabs example">
                      {
                        images?.map((item, inx) => (
                          <Tab sx={{ maxWidth: '100%', padding: '5px' }} label={item ? <img className={styles.smallImg} style={{ borderRadius: '5px', marginRight: 'auto' }} src={item} /> : null} value={inx} />

                        ))
                      }
                    </TabList>
                  </Box>

                  {images?.map((item, inx) => (
                    <TabPanel
                      value={inx}>
                      <img className={styles.bigImg} src={item} style={{ borderRadius: '5px', margin: 'auto' }} alt="" />
                    </TabPanel>

                  ))}
                </TabContext>
              </Box>

              <div className={styles.about_product}>
                <div className={styles.likes_views}>
                  <h2>{name}</h2>
                  <div>
                    <span>
                  <span>{viewCount}</span>
                  <BsEyeFill/>
                 </span>
                    <span>
                  <span>{likeCount?.length}</span>
                  likes
                 </span>
                 
                  </div>
                </div>
                <p>{category}</p>
                <div className={styles.add_product_btn}>
                 
                  <div className={styles.price_addCount}>

                    {
                  productItem.length !== 0 && 
                   (<div className={styles.plus_minus_btn}>
                    <button><GoPlus onClick={handleIncrement} className={styles.plus_icon} size={22} /></button>
                    {
                     productItem.map((item)=>(
                      <span>{item.quantity}</span>
                     ))
                    }
                    <button><HiMinus onClick={handleDecrement} className={styles.minus_icon} size={22} /></button>
                  </div>)
                 }
                    <h3>{formatCurrency(price)}</h3>

                  </div>
                  <button className={styles.addProduct} onClick={addToCart}> <span>Add product</span> <FiPlus className={styles.fiPlus} size={22} /></button>

                </div>
                <div className={styles.desc}>
                  <h4>{shortDesc}</h4>
                </div>
                <div className={styles.descriptions}>
                  <div>
                    <div className={styles.tab_btn}>
                      <button onClick={() => setTab('reviews')} className={tab === 'reviews' ? styles.active_tab : ''}>Reviews </button>
                      <button onClick={() => setTab('desc')} className={tab === 'desc' ? styles.active_tab : ''}>Description</button>

                    </div>
                    <div className={styles.description_rewiews}>
                      {
                        tab === 'desc' ?
                          <p>{description}</p>
                          :
                          <div>
                            {
                              reviews?.map((item, index) => (
                                <>
                                  <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly />
                                  <p>{item.text}</p>
                                </>
                              ))
                            }
                          </div>
                      }
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
      <div>
        <h1 className={styles.category_name}>Similar products</h1>
        <ProductList data={categoryData} />
      </div>

    </>
  )
}

export default ProductDetails






















// ~~~~~~~~~ Form send mesage~~~~~~~~~~~//

// <div className={styles.descriptions}>
//             <div>
//               <div className={styles.tab_btn}>
//                 <button onClick={() => setTab('desc')} className={tab === 'desc' ? styles.active_tab : ''}>Description</button>
//                 <button onClick={() => setTab('rewiews')} className={tab === 'rewiews' ? styles.active_tab : ''}>Reviews </button>

//               </div>
//               <div className={styles.description_rewiews}>
//                 {
//                   tab === 'desc' ?
//                     <p>{description}</p>
//                     :
//                     <div>
//                       {
//                         reviews?.map((item, index) => (
//                           <div key={index}>
//                             <span>{item.rating}</span>
//                             <p>{item.text}</p>
//                           </div>
//                         ))
//                       }
//                     </div>
//                 }
//               </div>
//             </div>
//             <div className={styles.send_message}>


//               <form onSubmit={submitHandler}>

//                 <div className={styles.send_msg}>
//                   <label>Your Name</label>
//                   <input
//                     ref={rewiewUser}
//                     value={namee}
//                     onChange={(e) => setNamee(e.target.value)}
//                     type='text' placeholder='Enter your name'
//                     required
//                   />
//                 </div>
//                 <div className={styles.send_msg}>
//                   <label> Enter Message</label>
//                   <textarea
//                     ref={reviewMsg}
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     rows={5}
//                     type='text' placeholder='Message'
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className={styles.rate}>Rate our product</label>
//                   <div className={styles.stars}>
//                     <Rating
//                       name="hover-feedback"
//                       value={rating}
//                       precision={0.5}
//                       onChange={(event, newValue) => {
//                         setRating(newValue);
//                       }}
//                       onChangeActive={(event, newHover) => {
//                         setHover(newHover);
//                       }}
//                       emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}

//                     />
//                     {rating !== null && (
//                       <div className={styles.star_desc}>{labels[hover !== -1 ? hover : rating]}</div>
//                     )}
//                   </div>
//                 </div>
//                 <h1>{text}</h1>

//                 <button className={styles.login_btn} type="submit">
//                   Send
//                 </button>


//               </form>


//             </div>
//           </div>