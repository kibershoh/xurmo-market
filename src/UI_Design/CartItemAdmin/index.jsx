import React, { useEffect, useRef, useState } from 'react'
import styles from '../CartItemsStyles/styles.module.scss'
import { RiDeleteBin5Line } from 'react-icons/ri'
import {  deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../Firebase/config'
import { TbListDetails} from 'react-icons/tb'
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
import { GoPlus } from 'react-icons/go'
import { time } from '../../Constants/function'
const CartItemAdmin = ({ item, number }) => {

  const {id, name, category, price,benefit,bodyPrice, images, reviews, shortDesc, description, user, date } = item
  const navigate = useNavigate()
  const [isAction, setIsAction] = useState(false)

  const deleteProduct = async (id) => {
    if (window.confirm("Do you want to delete the product?")) {

      await deleteDoc(doc(db, "products", id))
    }

  }


  const title = [ "Image:", "Name:", "Category:", "Price:", "Date:", "Action:"]
  // ~~~~~~~~Modal Stayle ~~~~~~~Functions ~~~~~~~~~~~//

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  
  const styleBox = {
    position: 'absolute',
    top:'50%',
    left: {
      xs:'50%',
      sm:'60%',
    },
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
                <div  className={styles.close_modal}>
                  <span className={styles.title}>Product Details</span>
                  <div><span> added by</span> <p><img src={user.userImg} /><span>{user.userName}</span></p>  </div>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={handleClose}><CgClose className={styles.close_icon} size={20} /></motion.button>

              <p className={styles.date}>{time(date)}</p>
                </div>
                <hr />


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
                    
                    <h2>{name}</h2>
                   <div className={styles.category}>
                     <h3>{formatCurrency(price)}</h3>
                    <p>{category}</p>
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
              </Box>

            </Modal>
             
          </>
          {title.map((label, index) => (
            <td key={index} scope="row" data-label={label}>
              {label === "ID_:" ? <p>{number + 1}   </p> : null}
              {label === "Image:" ? <img onClick={handleOpen} src={images[0]} alt="" /> : null}
              {label === "Name:" ? name : null}
              {label === "Category:" ? category : null}
              {label === "Price:" ? <div className={styles.price_benefit}>
              <span>
                {formatCurrency(bodyPrice)}</span>
                <GoPlus size={22} className={styles.goPlus}/> 
              <span>
                {formatCurrency(benefit)}</span>
              </div> : null}
              {label === "Date:" ? time(date) : null}
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
                    <button onClick={()=>navigate(`/dashboard/edit/${id}`)} type="button" className={styles.delete_btn}>
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