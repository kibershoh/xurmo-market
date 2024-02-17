import React from 'react'
import styles from './style.module.scss'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className={styles.footer}>
      <Link to={'/'}></Link>
    </div>
  )
}

export default Footer