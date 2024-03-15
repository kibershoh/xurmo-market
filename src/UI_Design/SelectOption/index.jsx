import React from 'react'
import styles from './styles.module.scss'
import useGetData from '../../Custom Hooks/UseGetData'
const Select = ({handleFilter,category}) => {
  const {data:categories,loading} = useGetData("categories")
  const categoryEdit = (text)=>{
    return  text.charAt(0).toUpperCase() + text.slice(1)
  }
  return (
   <>
    <select 
        name="languages"
      id="language-select"
       
      onChange={handleFilter}
        className={styles.category_select}>
          <option value="">{category === '' ? '--Category--' : category}</option>
          {
             categories?.map((item,index)=>(
              <option key={index} value={item.category}>
             { item.category}
              </option>
            ))
          }
        </select>
   </>
  )
}

export default Select