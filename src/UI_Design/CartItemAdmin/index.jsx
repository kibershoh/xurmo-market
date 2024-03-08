import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineDelete } from 'react-icons/md'
import styles from '../CartItemsStyles/styles.module.scss'
import { useDispatch } from 'react-redux'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { cartActions } from '../../Redux/slice/cartSlice'
import { Timestamp, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../Firebase/config'
import { TbListDetails, TbNumber, TbNumber0 } from 'react-icons/tb'
import { IoIosClose } from "react-icons/io";

import { Box, Modal, Rating, Tab } from '@mui/material'
import { CgClose } from 'react-icons/cg'
import { formatCurrency } from '../../Constants/utils/moneyCurrent'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { BiEditAlt } from 'react-icons/bi'
import clsx from 'clsx'
const CartItemAdmin = ({ item, number }) => {

  const { id, name, category, price, images, reviews, shortDesc, description, user, dateExample, timestamp } = item
  const navigate = useNavigate()
  const [isAction, setIsAction] = useState(false)

  const deleteProduct = async (id) => {
    if (window.confirm("Do you want to delete the product?")) {

      await deleteDoc(doc(db, "products", id))
    }

  }


  const title = ["ID_:", "Image:", "Name:", "Category:", "Price:", "Date:", "Action:"]
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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const dateObj = new Date(dateExample);

  const IsAction = () => {
    setIsAction(!isAction)
  }


  const IsActionRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        IsActionRef.current &&
        !IsActionRef.current.contains(event.target)
      ) {
        setIsAction(false);
        // setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })
  return (
    <tr ref={IsActionRef}>
      {
        item &&
        <>
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
                  <div><span> added by</span> <p><img src={user.userImg} /><span>{user.userName}</span></p>  </div>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={handleClose}><CgClose className={styles.close_icon} size={20} /></motion.button>

                </div>

                <div className={styles.detailAdmin}>



                  <Box sx={{ display: 'flex' }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                          orientation='vertical'
                          onChange={handleChange} aria-label="lab API tabs example">
                          {
                            images.map((item, inx) => (
                              <Tab sx={{ maxWidth: '100%' }} label={item ? <img width='100%' className={styles.smallImg} src={item} /> : null} value={inx} />

                            ))
                          }
                        </TabList>
                      </Box>

                      {images.map((item, inx) => (
                        <TabPanel value={inx}>
                          <img className={styles.bigImg} src={item}  alt="" />
                        </TabPanel>

                      ))}
                    </TabContext>
                  </Box>

                  <div className={styles.about_product}>
                    <h4>Created: {dateExample}</h4>
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
              {label === "ID_:" ? <p>{number + 1}   </p> : null}
              {label === "Image:" ? <img onClick={handleOpen} src={images[0]} alt="" /> : null}
              {label === "Name:" ? name : null}
              {label === "Category:" ? category : null}
              {label === "Price:" ? price : null}
              {label === "Date:" ? dateExample : null}
              {label === "Action:" ? (
                <div className={styles.threeDote}>

                  <BsThreeDotsVertical onClick={IsAction} className={styles.threeIcon} size={22} />
                  <div className={clsx(
                    styles.delete, isAction ? styles.show : styles.hide
                  )}>
                    <IoIosClose onClick={IsAction} size={18} className={styles.close_btn} />
                    <button onClick={() => { deleteProduct(id) }} type="button" className={styles.delete_btn}>
                      <span className={styles.btn_icon}>
                        <RiDeleteBin5Line size={18} />
                      </span>
                      <span className={styles.btn_text}>Delete</span>
                    </button>
                    <button onClick={handleOpen} type="button" className={styles.delete_btn}>
                      <span className={styles.btn_text}>Details</span>
                      <span className={styles.btn_icon}>
                        <TbListDetails size={18} />
                      </span>
                    </button>
                    <button onClick={() => navigate(`/dashboard/edit/${id}`)} type="button" className={styles.delete_btn}>
                      <span className={styles.btn_text}>Edit</span>
                      <span className={styles.btn_icon}>
                        <BiEditAlt size={18} />
                      </span>
                    </button>
                  </div>
                </div>

              ) : null}
            </td>
          ))}
        </>
      }
    </tr>

  )
}

export default CartItemAdmin