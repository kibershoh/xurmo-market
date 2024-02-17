import React from 'react'
import styles from './styles.module.scss'
const TotalSection = ({title}) => {
  return (
    <div className={styles.total_section}>

        <h1>
            {title}
        </h1>
    </div>
  )
}

export default TotalSection