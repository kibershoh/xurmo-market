import React from 'react'
import styles from './styles.module.scss'
const Select = ({handleFilter}) => {
  
  return (
    <select 
        name="languages"
      id="language-select"
      onfocus="this.size=6;"
      onblur="this.size=0;"
      onchange="this.size=1; this.blur()"
      onChange={handleFilter}
        className={styles.category_select}>
          <option value="all">--Select a category--</option>
          <option value="mobile">Phones</option>
          <option value="micraphone">Micraphones</option>
          <option value="mouse">Mouses</option>
          <option value="guitar">Guitars</option>
          <option value="wireless">Wireless</option>
          <option value="watch">Watch</option>
        </select>
  )
}

export default Select