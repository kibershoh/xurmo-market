import React from 'react'
import styles from './styles.module.scss'
import {motion} from 'framer-motion'
const AddProductBtn = ({click}) => {
  return (
    <div className={styles.add_product_btn}>
        <motion.button whileHover={{scale:1.05}} onClick={click}>Add Product</motion.button>
    </div>
  )
}

export default AddProductBtn