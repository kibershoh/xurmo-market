import React from 'react'
import styles from './styles.module.scss'
import { servicesData } from '../../Constants/data/Services'
import clsx from 'clsx'
const Services = () => {
  return (
    <div className={styles.services}>
     {servicesData.map((service)=>(
        <div className={styles.service} style={{background: service.bgColor}} >
            <div className={styles.icon}>
                <span>
                    {service.icon}
                </span>
            </div>
            <div className={styles.secure}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
            </div>
        </div>
     ))}
    </div>
  )
}

export default Services