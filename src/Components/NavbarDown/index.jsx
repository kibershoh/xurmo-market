import React from 'react'
import styles from './styles.module.scss'
import { GoHome } from 'react-icons/go'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FiShoppingCart } from 'react-icons/fi'
import { IoMdHeartEmpty } from 'react-icons/io'
import { PiShoppingBagOpen } from "react-icons/pi";

import { FaRegUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
const NavbarDown = () => {
  const navigate = useNavigate()
  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const [activeLink, setActiveLink] = useState('')

  const navbarDownLinks = [
    {
      id: 1,
      icon: <GoHome size={19} />,
      name: 'Home',
      path: '/',

    },
    {
      id: 2,
      icon: <HiOutlineShoppingBag size={19} />,
      name: 'Shop',
      path: '/shop',

    },
    {
      id: 3,
      icon: <FiShoppingCart size={19} />,
      name: 'Cart',
      path: '/cart',

    },
    {
      id: 4,
      icon: <IoMdHeartEmpty size={19} />,
      name: 'Liked',
      path: '/liked',

    },
    {
      id: 5,
      icon: <FaRegUser size={19} />,
      name: 'Profile',
      path: '/profile',

    },
  ]
  const ActiveLinkHandler = (name) => {
    setActiveLink(name)
    document.title = name
  }
  return (
    <nav className={styles.navbar_down}>
      <div className={styles.links}>
        <button onClick={() => ActiveLinkHandler('Home')}>

          <Link className={clsx(

            activeLink === 'Home' ? styles.activeLink : '',

          )} to={'/'}>
            <GoHome size={19} />
            <span>Home</span>
          </Link>
        </button>
        <button onClick={() => ActiveLinkHandler('Shop')}>

          <Link className={clsx(

            activeLink === 'Shop' ? styles.activeLink : '',

          )} to={'/shop'}>
            <HiOutlineShoppingBag size={19} />
            <span>Shop</span>
          </Link>
        </button>
        <button onClick={() => ActiveLinkHandler('My Orders')}>

          <Link className={clsx(

            activeLink === 'My Orders' ? styles.activeLink : '',

          )} to={'/my_orders'}>
            <PiShoppingBagOpen size={19} />
            <span>My Orders</span>
          </Link>
        </button>
        <button onClick={() => ActiveLinkHandler('Cart')}>

          <Link className={clsx(
           styles.cart,
            activeLink === 'Cart' ? styles.activeLink : '',

          )} to={'/cart'}>
             <FiShoppingCart size={19} />
            <span>Cart</span> 
            <span className={styles.totalQuantity}>{totalQuantity}</span>
          </Link>
        </button>
        <button onClick={() => ActiveLinkHandler('Liked')}>

          <Link className={clsx(

            activeLink === 'Liked' ? styles.activeLink : '',

          )} to={'/liked'}>
            <IoMdHeartEmpty size={19} />
            <span>Liked</span>
          </Link>
        </button>
        
      </div>
    </nav>
  )
}

export default NavbarDown