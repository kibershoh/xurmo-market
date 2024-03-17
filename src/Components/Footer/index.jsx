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
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const aboutUs = [
  { value: 'aboutUs', label: 'About Us' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const forCustomers = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const contactUs = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
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
          <h3>About Us</h3>
          <ul>
            <li><Link>Home</Link></li>
            <li><Link>Amazon</Link></li>
            <li><Link>Uzum</Link></li>
          </ul>
        </div>
        <div className={styles.informations}>
          <h3>For Customer</h3>
          <ul>
            <li><Link>Home</Link></li>
            <li><Link>Amazon</Link></li>
            <li><Link>Uzum</Link></li>
          </ul>
        </div>
        <div className={styles.informations}>
          <h3>About Us</h3>
          <ul>
            <li><Link>Home</Link></li>
            <li><Link>Amazon</Link></li>
            <li><Link>Uzum</Link></li>
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
 
          <Select defaultValue={aboutUs[0]} options={aboutUs} />
        </div>
        <div className={styles.informations}>
          <Select options={forCustomers} />
        </div>
        <div className={styles.informations}>
          <Select  options={contactUs} />
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
    </div>
  )
}

export default Footer