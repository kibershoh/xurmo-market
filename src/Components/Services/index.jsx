import React from 'react'
import styles from './styles.module.scss'
import { servicesData } from '../../Constants/data/Services'
import clsx from 'clsx'
import {motion} from 'framer-motion'
const Services = () => {
  let x200 = 200;
  let x_200 = -200;
  let x0 = 0;
  let x100 = 100;
  const switchServiseX = (n)=>{
    if(n===0){
      return x200
    }
    if(n===1){
      return x_200
    }
    if(n===2){
      return x0
    }
    if(n===3){
      return x_200
    }
    else return x100
  
  }
  const switchServiseY = (n)=>{
    if(n===0){
      return x0
    }
    if(n===1){
      return x200
    }
    if(n===2){
      return x200
    }
    if(n===3){
      return x0
    }
    else return x100
  
  }
  return (
    <div
    
    className={styles.services}>
     {servicesData?.map((service,index)=>(
        <motion.div
       
         initial={{
        opacity: 0,
        // if odd index card,slide from right instead of left
        x: switchServiseX(index),
        y: switchServiseY(index)
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y:0, // Slide in to its original position
        transition: {
          duration: 0.5 // Animation duration
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