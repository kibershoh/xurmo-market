import React from 'react'
import styles from './styles.module.scss'
import { servicesData } from '../../Constants/data/Services'
import clsx from 'clsx'
import {motion} from 'framer-motion'
const Services = () => {
   
  return (
    <div
    
    className={styles.services}>
     {servicesData?.map((service)=>(
        <motion.div
       
         initial={{
        opacity: 0,
        y: -250,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y:0, // Slide in to its original position
        transition: {
          duration: 1 // Animation duration
        }
      }}
      // viewport={{ once: true }}
        
        className={styles.service} style={{background: service.bgColor}} >
            <div className={styles.icon}>
                <span>
                    {service.icon}
                </span>
            </div>
            <div className={styles.secure}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
            </div>
        </motion.div>
     ))}
    </div>
  )
}

export default Services