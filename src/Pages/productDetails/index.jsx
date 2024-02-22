import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';

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
// import Products from '../../Constants/data/products'

// -----------Redux----------//
import { cartActions } from '../../Redux/slice/cartSlice';
import useGetData from '../../Custom Hooks/UseGetData';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FiPlus } from 'react-icons/fi';




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
  const { ID, price, description, downloadURLs, name, category, shortDesc, reviews, dateExample } = product

  // ----------States -----------//
  const [namee, setNamee] = useState('')
  const [message, setMessage] = useState('')
  const [tab, setTab] = useState('desc')
  // console.log(product);


  const categoryData = products.filter((item) => {
    return item.category === product.category && item.ID !== product.ID;
  })

  const labels = {
    0.5: 'Uselkjm',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  // ----------Stars-----------//
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  let text = ''

  // -------Rewiews----------//
  const rewiewUser = useRef('')
  const reviewMsg = useRef('')
  const dispatch = useDispatch()


  // -------------Functions---------//
  const submitHandler = (e) => {
    e.preventDefault()

    const reviewUserName = rewiewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    switch (rating) {
      case 0.5: text = labels['0.5']
        break;
      case 1: text = labels[1]
        break;
      case 1.5: text = labels['1.5']
        break;
      case 2: text = labels['2']
        break;
      case 2.5: text = labels['2.5']
        break;
      case 3: text = labels['3']
        break;
      case 3.5: text = labels['3.5']
        break;
      case 4: text = labels['4']
        break;
      case 4.5: text = labels['4.5']
        break;
      case 5: text = labels['5']
        break;
      default: text = ' '

    }

    const rewiewArr = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating: rating,
      text: text,
    }
    toast.success('Reviews send!')
  }
  const addToCart = () => {
    dispatch(cartActions.addProduct({
      id: product.ID,
      downloadURL: product.downloadURLs,
      name: product.name,
      price: product.price,
    }))
  }

  // const rewiews = product.reviews;


  // Tab For images
  const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 0,
    transform: {
      xs: 'translate(-50%, -50%)',
      sm: 'translate(-50%, -50%)'
    },
    width: {
      xs: '90%',
      sm: '70%',
    },
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    pb: 1,
    border: '1px solid white',
    outline: 'none',


  };
  const styleModal = {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100vh'
  }

  // ~~~~~~~~~~ Description Tab~~~~~~~~~~~~~//
  // const [tab, setTab] = useState('reviews')
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>

      <div id='shop_detail' className={styles.details}>



        <div className={styles.product_details}>
          <div className={styles.product_detail}>
            <div className={styles.detailAdmin}>



              <Box>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList

                      onChange={handleChange} aria-label="lab API tabs example">
                      {
                        downloadURLs?.map((item, inx) => (
                          <Tab sx={{ maxWidth: '100%' }} label={item ? <img width='100%' style={{ borderRadius: '5px', marginRight: 'auto' }} height={60} src={item} /> : null} value={inx} />

                        ))
                      }
                    </TabList>
                  </Box>

                  {downloadURLs?.map((item, inx) => (
                    <TabPanel value={inx}>
                      <img width='80%' src={item} height={'250px'} style={{ borderRadius: '5px', margin: 'auto', border: '1px solid indigo' }} alt="" />
                    </TabPanel>

                  ))}
                </TabContext>
              </Box>

              <div className={styles.about_product}>
                <h2>{name}</h2>
                <p>{category}</p>
                <div className={styles.add_product_btn}>
                  <h3>{formatCurrency(price)}</h3>
                    <button> <span>Add product</span> <FiPlus className={styles.fiPlus} size={22} /></button>

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