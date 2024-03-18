import React from 'react'
import styles from './style.module.scss'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { SiInstagram, SiTelegram } from "react-icons/si";
import { PiTelegramLogo } from 'react-icons/pi'
import { GrFacebookOption } from "react-icons/gr";
import { LiaLinkedinIn } from "react-icons/lia";
import { AiOutlineYoutube } from "react-icons/ai";
import navLinks from '../../Constants/NavbarItems';
import { useState } from 'react';
import Select from 'react-select';
// ~~~~~~~~~~~Images~~~~~~~~~~~~~~~~~~~//
import visa from '../../assets/creditCardLogos/visa.png'
import uzcard from '../../assets/creditCardLogos/uzcard.png'
import humo from '../../assets/creditCardLogos/humo.png'
import paypal from '../../assets/creditCardLogos/paypal.png'
 import { MdAlternateEmail } from "react-icons/md";

const aboutUs = [
  { value: 'aboutUs', label: 'About Us', },
  { value: 'all_branches', label: 'All Branches',url:'/' },
  { value: 'adresses', label: 'Adresses',url:'/shop' },
  { value: 'history', label: "Company's history",url:'/contact' }
]
const forCustomers = [
  { value: 'forCustomers', label: 'For Customer' },
  { value: 'freeShipping', label: 'Free Shipping',url:'/shipping' },
  { value: 'Security', label: 'Security',url:'/' },
  
]
const contactUs = [
  { value: 'contactUs', label: 'Contact Us' },
  { value: 'phoneNumber', label: '+998 94 009 51 01',url:'/' },
  { value: 'email', label:'saminovoybek563@gmail.com',url:'/',icon:<MdAlternateEmail/> },
]
const socialMedias = [
  {
    id: 1,
    path: 'https://instagram.com/_bekdev_',
    icon: <SiInstagram size={18} />

  },
  {
    id: 2,
    path: 'https://t.me/Kibershoh',
    icon: <PiTelegramLogo size={18} />

  },
  {
    id: 3,
    path: 'https://facebook.com',
    icon: <GrFacebookOption size={18} />

  },
  {
    id: 4,
    path: 'https://www.linkedin.com/in/oybek-saminov-429816265/',
    icon: <LiaLinkedinIn size={18} />

  },
  {
    id: 5,
    path: 'https://youtube.com',
    icon: <AiOutlineYoutube size={18} />

  },
]
const CustomOption = ({ innerRef, innerProps, data }) => (
  <Link style={{display:'block',color:'indigo',fontFamily:'Noto Sans',margin:'10px'}} ref={innerRef} {...innerProps} to={data.url}  rel="noopener noreferrer">
    {data.label}
  </Link>
);
 
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.waves}>
        <div className={clsx(styles.wave1, styles.wave)}> </div>
        <div className={clsx(styles.wave2, styles.wave)}> </div>
        <div className={clsx(styles.wave3, styles.wave)}> </div>
        <div className={clsx(styles.wave4, styles.wave)}> </div>
      </div>

      <div className={styles.items_desktop}>
        <div className={styles.informations}>
           <ul>
            {
             aboutUs.map((item)=>(
              <li><Link to={item.url}>{item.label}</Link></li>
             )) 
            }
          </ul>
        </div>
        <div className={styles.informations}>
           <ul>
            {
             forCustomers.map((item)=>(
              <li><Link to={item.url}>{item.label}</Link></li>
             )) 
            }
          </ul>
        </div>
        <div className={styles.informations}>
           <ul>
            {
             contactUs.map((item)=>(
              <li><Link to={item.url}>{item.icon}{item.label}</Link></li>
             )) 
            }
          </ul>
        </div>
         
        <div className={styles.icons}>
          <h3>Find us in social medias</h3>
          <div>
            {
              socialMedias?.map((link) => (
                <Link target='_blank' to={link.path}>{link.icon}</Link>
              ))
            }
          </div>
        </div>
      </div>
      <div className={styles.items_mobile}>
        <div className={styles.informations}>
 
          <Select
          components={{Option:CustomOption}}
           
          defaultValue={aboutUs[0]} options={aboutUs} />
        </div>
        <div className={styles.informations}>
          <Select
          components={{Option:CustomOption}}
           
          defaultValue={forCustomers[0]} options={forCustomers} />
        </div>
        <div className={styles.informations}>
         <Select
          components={{Option:CustomOption}}
           
          defaultValue={contactUs[0]} options={contactUs} />
        </div>

          <div className={styles.icons}>
                <h3>Find us in social medias</h3>
                <div>
                  {
                    socialMedias?.map((link) => (
                      <Link target='_blank' to={link.path}>{link.icon}</Link>
                    ))
                  }
                </div>
          </div>
      </div>
<div className={styles.card_images}>
              <div className={styles.card_logos}>
                <img src={visa} alt="" />
              <img src={paypal} alt="" />
              <img src={humo} alt="" />
              <img src={uzcard} alt="" />
              </div>
            </div>
    </div>
  )
}

export default Footer