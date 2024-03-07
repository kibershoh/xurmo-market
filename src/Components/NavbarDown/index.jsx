import React from 'react'
import styles from './styles.module.scss'
import { GoHome } from 'react-icons/go'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { FiShoppingCart } from 'react-icons/fi'
import { IoMdHeartEmpty } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
const NavbarDown = () => {
  const navbarDownLinks = [
    {
      id:1,
      icon:<GoHome size={18}/>,
      name:'Home',
      path:'/',

    },
    {
      id:2,
      icon:<HiOutlineShoppingBag size={18}/>,
      name:'Shop',
      path:'/',

    },
    {
      id:3,
      icon:<FiShoppingCart size={18}/>,
      name:'Cart',
      path:'/',

    },
    {
      id:4,
      icon:<IoMdHeartEmpty size={18}/>,
      name:'Liked',
      path:'/',

    },
    {
      id:5,
      icon:<FaRegUser size={18}/>,
      name:'Profile',
      path:'/',

    },
  ]
  return (
    <nav className={styles.navbar_down}>
<div className={styles.links}>
        {
          navbarDownLinks.map(({id,name,path,icon})=>(
 <div key={id}>
   {icon}
  <span>{name}</span>
 </div>
  ))
}
</div>
    </nav>
  )
}

export default NavbarDown