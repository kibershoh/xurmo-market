import React, { useState } from 'react'
import { Box, Modal } from '@mui/material'
import { motion } from 'framer-motion'
import styles from './styles.module.scss'
import { CgClose } from 'react-icons/cg'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';


import UseAuth from '../../../Custom Hooks/UseAuth'
import { toast } from 'react-toastify'
import { db } from '../../../Firebase/config'
import useGetData from '../../../Custom Hooks/UseGetData'
import { IoCloseOutline } from 'react-icons/io5'
import { FaPlus } from 'react-icons/fa'
import { GoPlug, GoPlus } from 'react-icons/go'
import { playErrorSound, playSuccessSound } from '../../../Constants/sounds'
const Categories = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const handleClose = () => setOpen(false);
  const { data: categories, loading } = useGetData('categories')
  const { currentUser } = UseAuth()
  const handleOpen = () => setOpen(true);
  const id = uuidv4()
  const data = {
    category: category
  }
  const docRef = collection(db, 'categories');
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (category === '') {
      toast.error('Nothing Entered');
    }
    else{

      await addDoc(docRef, data);
      toast.success("chotki");
      playSuccessSound();
    }
    setCategory('');

  } catch (error) {
    toast.error(error.message);
    playErrorSound();
  }
};


  const styleBox = {
    position: 'absolute',
    top: '50%',
    left: {
      xs: '50%',
      sm: '60%',
    },
    right: 0,
    transform: {
      xs: 'translate(-50%, -50%)',
      sm: 'translate(-50%, -50%)'
    },
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
    padding:'5px 15px',


  };
  const styleModal = {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100vh',
  }
  const categoryText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const deleteProduct = async (id) => {
    if (window.confirm("Do you want to delete the product?")) {

      await deleteDoc(doc(db, "categories", id))
    }

  }
  return (
    <div className={styles.categories}>
 <form onSubmit={handleSubmit} className={styles.input_and_btn}>
             <input placeholder='add category...' type="text" onChange={(e) => setCategory(e.target.value)} />
          <button className={styles.add_category} type='submit'>Add Category</button>

           </form>
      

      <div className={styles.category}>
        {
          categories?.map((item) => (
            <p><span>{categoryText(item.category)}</span><IoCloseOutline onClick={() => deleteProduct(item.id)} size={20} /></p>
          ))
        }
      </div>
    </div>
  )
}

export default Categories