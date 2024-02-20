import React, { useState } from 'react'
import { MdOutlineDelete } from 'react-icons/md'
import styles from '../CartItemsStyles/styles.module.scss'
import { useDispatch } from 'react-redux'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { cartActions } from '../../Redux/slice/cartSlice'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../Firebase/config'
import { TbNumber, TbNumber0 } from 'react-icons/tb'
import { Box, Modal, Rating } from '@mui/material'
import { motion } from 'framer-motion'
import { CgClose } from 'react-icons/cg'
import { formatCurrency } from '../../Constants/utils/moneyCurrent'

const CartItemAdmin = ({ item, number }) => {

  const { id, name, category, price, downloadURLs,reviews, shortDesc, description,user } = item

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id))

  }

  const title = ["ID_:", "Image:", "Name:", "Category:", "Price:", "Action:",]
  // ~~~~~~~~Modal Stayle ~~~~~~~Functions ~~~~~~~~~~~//

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
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
    const [tab, setTab] = useState('reviews')

  return (
    <tr>
      <>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          sx={styleModal}
        >
          <Box sx={styleBox}>
            <div div className={styles.close_modal}>
              <h2>Product Details</h2>
              <p>added by {user.userName}</p>
              <motion.button whileHover={{ scale: 1.1 }} onClick={handleClose}><CgClose className={styles.close_icon} size={20} /></motion.button>
            </div>

            <div className={styles.detailAdmin}>
              <div className={styles.images}>
                <div className={styles.firstImg}>
                  <img src={downloadURLs[1]} alt="" />
                </div>
                <div className={styles.otherImages}>
                  <div>
                    <img src={downloadURLs[1]} alt="" /><br />

                  </div>
                  <div>
                    <img src={downloadURLs[2]} alt="" /><br />

                  </div>
                  <div>
                    <img src={downloadURLs[2]} alt="" /><br />

                  </div>
                  <div>
                    <img src={downloadURLs[2]} alt="" /><br />

                  </div>
                  

                  
                </div>
              </div>
              <div className={styles.about_product}>
                <h2>{name}</h2>
                <p>{category}</p>
                <h3>{formatCurrency(price)}</h3>
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
          </Box>

        </Modal>
      </>
      {title.map((label, index) => (
        <td key={index} scope="row" data-label={label}>
          {label === "ID_:" ? <p>{number + 1}</p> : null}
          {label === "Image:" ? <img onClick={handleOpen} src={downloadURLs[0]} alt="" /> : null}
          {label === "Name:" ? name : null}
          {label === "Category:" ? category : null}
          {label === "Price:" ? price : null}
          {label === "Action:" ? (
            <div onClick={() => { deleteProduct(id) }} className={styles.delete}>
              <button type="button" className={styles.delete_btn}>
                <span className={styles.btn_text}>Delete</span>
                <span className={styles.btn_icon}>
                  <RiDeleteBin5Line size={18} />
                </span>
              </button>
            </div>
          ) : null}
        </td>
      ))}
    </tr>

  )
}

export default CartItemAdmin