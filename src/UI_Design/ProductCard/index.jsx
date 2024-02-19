import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import styles from './styles.module.scss'

import { FiHeart } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";

import { formatCurrency } from '../../Constants/utils/moneyCurrent'
import { useDispatch, useSelector } from 'react-redux';

// ------------ React Icons-------------//
import { LuPlus } from "react-icons/lu";
import thumb from '../../assets/thumb.png'
import fillThumb from '../../assets/fillThumb.png'
// Redux
import { cartActions } from '../../Redux/slice/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useGetData from '../../Custom Hooks/UseGetData';
import CardLoader from '../../Constants/LoaderCard';
import { auth, db } from '../../Firebase/config';
import { Timestamp, addDoc, collection, doc, onSnapshot, arrayUnion, setDoc, updateDoc, query, getDocs, orderBy, getDoc, deleteDoc} from 'firebase/firestore';
import { FaHeart } from 'react-icons/fa';
// import    from '@mui/material/Modal';
import { Box, Typography, Modal, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import { CgClose } from 'react-icons/cg';
import { TextInput } from './CommentInput';
import { IoSend } from 'react-icons/io5';
import UseAuth from '../../Custom Hooks/UseAuth';
const ProductCard = ({ item, index }) => {
  const {currentUser} = UseAuth()
  const { idParams } = useParams()
  const { ID, id, name, price, downloadURL, category, reviews, likeCount,timestamp } = item
  const productItems = useSelector(state => state.cart.cartItems)
  const { data: products, loading } = useGetData("products")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const [commentText, setCommentText] = useState("")
  const active = () => {
    if (item.action) {
      setAdded(false)
    }
    else {
      setAdded(true)
    }
  }
  const addToCart = () => {
    dispatch(
      cartActions.addProduct({
        id: id,
        name: name,
        price: price,
        downloadURL: downloadURL,
      })
    )
    active()


  }

  const toDetails = (id) => {
    navigate('/shop/' + id)
  }
  const [likesNo, setLikesNo] = useState(likeCount.length !== 0  ? likeCount.length : 0);
  const [isLikesOpen, setIsLikesOpen] = useState(false);
  const [likeCounts, setLikeCounts] = useState([]);
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
  // ~~~~~~~~~~~ Read Comment ~~~~~~~~~~//
    

  const [comments, setComments] = useState([]);


  // Пример использования функции для получения комментариев для определенного продукта
 

 useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsQuery = query(
          collection(db, 'products', id, 'comments'),
          orderBy('timestamp')
        );
        const commentsSnapshot = await getDocs(commentsQuery);
        const commentData = [];

        commentsSnapshot.forEach((doc) => {
          commentData.push({ id: doc.id, ...doc.data() });
        });

        setComments(commentData);
      } catch (error) {
        console.error('Error reading comments:', error);
      }
    };

    fetchComments();
  }, [idParams,comments]);

  const postComment = async () => {
    if(commentText !== ''){
      try {
      await addDoc(collection(db, "products", id, "comments"), {
        userName: currentUser.displayName,
        imgUrl: currentUser.photoURL,
        text: commentText,
        timestamp: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.log('Error adding comment:');
    }
    }
    setCommentText("")
  }



  
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 0,
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '90%',
      sm: '50%',
    },
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    pb: 1,
    
  };
  const styleModal = {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }

console.log(comments);

  // ~~~~~~~~~Delete comment ~~~~~~~~~~~~~~~//
   
  return (
    <>
      {
        (loading && !window.navigator.onLine) ? <CardLoader /> :
          (
            <div className={styles.product_item}>
              <button
                className={styles.like_btn}>

                <div>
                  {
                    likeCount.indexOf(currentUser?.displayName) != -1 ? (
                      <motion.button onClick={() => likesHandler(id)}> <motion.img whileHover={{ scale: 1.1 }} src={fillThumb} width='25px' alt="" /> {likesNo} </motion.button>
                    )
                      :
                      (currentUser ? <motion.button whileHover={{ scale: 1.1 }} onClick={() => likesHandler(id)}><img src={thumb} width='25px' alt="" /> {likesNo}</motion.button> : <p>Likes {likesNo}</p>)

                  }
                 {
                  likeCount.indexOf(currentUser?.displayName) !== -1 ?(
                     <motion.button whileHover={{ scale: 1.1 }} >
                    <TfiCommentAlt className={styles.comment_btn} size={20} />
                  </motion.button>
                  ):
                   <motion.button whileHover={{ scale: 1.1 }} onClick={handleOpen}>
                    <TfiCommentAlt className={styles.comment_btn} size={20} />
                  </motion.button>
                 }
                  <button whileHover={{ scale: 1.1 }} onClick={() => likesHandler(id)}>
                    {comments.length}
                  </button>

                </div>
              </button>


              <div className={styles.product_img}>
                <a href="#shop_detail">

                  <motion.img onClick={() => toDetails(ID)} whileHover={{ scale: 0.8 }} src={downloadURL} alt="" />

                </a>
              </div>

              <div className={styles.name_price}>
                <h3>{name}</h3>

                {/* <span>{likesNo} likes</span> */}
                <TextInput />
              </div>
              <div>
                <span className={styles.category}>{category}</span>
                <div>

                </div>
              </div>
              <div className={styles.product_add}>
                <motion.button onClick={addToCart} whileHover={{ scale: 1.09 }} className={styles.product_btn}>
                  <div className={styles.button_wrapper}>

                    <div className={styles.text}>

                      {
                        added ? 'Added' : 'Buy Now'
                      }
                    </div>
                    <span className={styles.icon}>
                      {
                        added ? 'Added' : <BsCartPlus />
                      }
                    </span>
                  </div></motion.button>
                <span>{formatCurrency(price)}</span>
                 
              </div>

              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                sx={styleModal}
              >
                <Box sx={styleBox}>
                  <div className={styles.close_modal}>
                    <h2>Comments</h2>
                    <motion.button whileHover={{scale:1.1}} onClick={handleClose}><CgClose className={styles.close_icon} size={20} /></motion.button>
                  </div>
<div className={styles.form_}>
  
                  <div className={styles.form_comments}>
                    <div className={styles.comments_box}>
                       {
                    comments.map((item, inx) => (
                      <div key={inx} className={styles.comments_}>
                        <div className={styles.user_img_name}>
                          <img src={item.imgUrl} alt="" />
                          <p>{item.userName}</p>
                          <button onClick={()=>deleteComment(id)}>Delete</button>

                          
                        </div>
                             <h4>{item.text}</h4>
                        
                      </div>
                    ))
                  }
                    </div>
                  
                  
                  <form className={styles.add_comment}>
                    <input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      type="text" 
                      placeholder='Add a comment....'
                      />
                      
                    <Button className={styles.send_btn} onClick={() => postComment(id)} >
                      <IoSend size={25}/>
                    </Button>
                  </form>
                  </div>
                  <img src={downloadURL} alt="" />
</div>
                </Box>

              </Modal>
            </div>
          )
      }



    </>
  )
}

export default ProductCard






