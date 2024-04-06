import React, {useState } from 'react'
import styles from './styles.module.scss'


// ------------ React Icons ~~~~~~ Images-------------//
import thumb from '../../assets/thumb.png'
import fillThumb from '../../assets/fillThumb.png'
import google from '../../assets/google.png'
import { BsEyeFill } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";


// ~~~~~~~~~Firebase~~~~~~~~~//
import {  db } from '../../Firebase/config';
import {   doc, updateDoc,getDoc, } from 'firebase/firestore';


// ~~~~~~~~~Libraries~~~~~~~~~//
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Box,   Modal } from '@mui/material';


// ~~~~~~~~~Components~~~~~~~~~//
import { formatCurrency } from '../../Constants/utils/moneyCurrent'
import useGetData from '../../Custom Hooks/UseGetData';
import CardLoader from '../../Constants/LoaderCard';
import UseAuth from '../../Custom Hooks/UseAuth';


// ~~~~~~~~~Redux~~~~~~~~~//
import { cartActions } from '../../Redux/slice/cartSlice';


const ProductCard = ({ item, index }) => {
  const { currentUser } = UseAuth()
  const { ID, id, name, price,benefit, images, category,  likeCount, viewCount } = item
  const { data: products, loading } = useGetData("products")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const active = () => {
    if (item.action) {
      setAdded(false)
    }
    else {
      setAdded(true)
    }
  }
  const addToCart = () => {
    Add()
    dispatch(
      cartActions.addProduct({
        id: ID,
        name: name,
        price: price,
        images: images,
        benefit:benefit,
      })
    )
    active()

  }


  const toDetails = (id) => {
    navigate('/shop/' + id)
    Add()
  }
  const [likesNo, setLikesNo] = useState(likeCount.length !== 0 ? likeCount.length : 0);
  const tempLikeCount = likeCount ? [...likeCount] : [];
  const docRef = doc(db, "products", id);

  async function likesHandler() {
    if (currentUser && likeCount !== undefined) {
      let ind = tempLikeCount.indexOf(currentUser?.displayName);
      if (ind !== -1) {
        tempLikeCount.splice(ind, 1);
        setLikesNo((unLiked) => unLiked - 1);
      } else {
        tempLikeCount.push(currentUser?.displayName);
        setLikesNo((liked) => liked + 1);
      }

      const data = {
        likeCount: tempLikeCount,
      };
      await updateDoc(docRef, data)
        .then((docRef) => {
        })
        .catch((error) => {
          toast.error(error)
        });
    }
  }




  const Add = async () => {
    const docRef = doc(db, "products", id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists() && id) {
      const productData = docSnapshot.data();
      const currentCount = productData.viewCount || 0;
      const updatedCount = currentCount + 1;
      const customerCount = productData.customers ? productData.customers.length : 0;

      await Promise.all([
        updateDoc(docRef, { viewCount: updatedCount }),
        updateDoc(docRef, { customerCount })
      ]);
    }
  };

  // ~~~~~~~~~~~~~~~~Modal Items ~~~~~~~~~~~~~//
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const styleBox = {
    position: 'absolute',
    right:'2%',
     
    // transform: {
    //   xs: 'translate(100%, 100%)',
    //   sm: 'translate(100%, 100%)'
    // },
    marginLeft:'auto',
    width: {
      xs: '90%',
      sm: '30%',
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
    zIndex:'10001',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100vh',
    padding:'20px'
  }
  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        sx={styleModal}
      >
        <Box sx={styleBox}>
          <div className={styles.register_modal}>
           <div className={styles.title}>
          <div>
            <img src={google} alt="" width='20' height={20} />
             <p>Please register to place an order.</p>
          </div>
          <IoCloseOutline size={21}/>

           </div>
             
             <hr />
            <div className={styles.login_btn}>
              <button onClick={()=>navigate('/register')}>
                Login
              </button>
              <p>
                because we need to ensure 2-way security when delivering the order
              </p>
            </div>
           
          </div>
             
        </Box>

      </Modal>
      {
        (loading && !window.navigator.onLine) ? <CardLoader /> :
          (
            <motion.div
            initial={{
        opacity: 0,
        
        // y: index % 2 === 0 && location.pathname === '/' ? 200 : (index % 2 === 1 ? 50 : -50),
        y:150,
        // x: index % 2 === 0 && location.pathname === '/' ? 200 :-200,
        // 0 1 2 3 4
        // 5 6 7 8 9
        // 1 2 3 4 5
        
         
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y:0, // Slide in to its original position
        transition: {
          duration: 0.5 // Animation duration
        }
      }}
            className={styles.product_item}>
              <button
                className={styles.like_btn}>

                <div>
                  {
                    likeCount.indexOf(currentUser?.displayName) != -1 ? (
                      <motion.button onClick={() => likesHandler(id)}> <motion.img whileHover={{ scale: 1.1 }} src={fillThumb} width='24px' alt="" /></motion.button>
                    )
                      :
                      (currentUser ? <motion.button whileHover={{ scale: 1.1 }} onClick={() => likesHandler(id)}><img src={thumb} width='24px' alt="" /> </motion.button> : <p className={styles.count_likes}>Likes {likesNo}</p>)

                  }


                </div>
              </button>


              <div className={styles.product_img}>
                <a href="#shop_detail">

                  <motion.img onClick={() => toDetails(ID)} whileHover={{ scale: 0.8 }} src={images[0]} alt="" />

                </a>
              </div>

              <div className={styles.name_price}>
                <h3>{name}</h3>
              </div>
              <div className={styles.category}>
                <span>{category}</span>
                <p>
                  <span>{viewCount}</span>
                  <BsEyeFill />
                </p>
              </div>
              <div className={styles.product_add}>
                <span>{formatCurrency(price)}</span>
                <motion.button onClick={currentUser ? addToCart : handleOpen} whileHover={{ scale: 1.09 }} className={styles.product_btn}>
                  <div className={styles.button_wrapper}>

                    <div className={styles.text}>

                      {
                        added ? 'Added' : 'Buy Now'
                      }
                    </div>
                    <span className={styles.icon}>
                      {
                        added ? 'Added' : <BsCartPlus className={styles.cart_icon} />
                      }
                    </span>
                  </div></motion.button>

              </div>


            </motion.div>
          )
      }



    </>
  )
}

export default ProductCard