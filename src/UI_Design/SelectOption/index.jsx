import React from 'react'
import styles from './styles.module.scss'
const Select = ({handleFilter,category,value,click,categories}) => {
  const categoryEdit = (text)=>{
    return  text.charAt(0).toUpperCase() + text.slice(1)
  }
  return (
   <>
    <select 
        name="languages"
      id="language-select"
      value={value}
       onClick={click}
      onChange={handleFilter}
        className={styles.category_select}>
          <option value=""> --Category-- </option>
          {
             categories?.map((category)=>(
              <option key={category} value={category}>
             {categoryEdit(category)}
              </option>
            ))
          }
        </select>
   </>
  )
}

export default Select