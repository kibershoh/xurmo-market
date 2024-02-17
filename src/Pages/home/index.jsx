import React, { useEffect, useState } from 'react'
import Slider from '../../Components/Slider'
import { Services, Timer } from '../../Components'
// import products from '../../Constants/data/products'
import styles from './styles.module.scss'
import { ProductList } from '../../UI_Design'
import useGetData from '../../Custom Hooks/UseGetData'

const Home = () => {
   const {data:products,loading} = useGetData("products")
  const [micraphone, setMicraphone] = useState(null)
  const [headphones, setHeadphones] = useState(null)
  const [wireless, setWireless] = useState(null)
  const [mobile, setMobile] = useState(null)
  const [guitar, setGuitar] = useState(null)
  const [watches, setWatches] = useState(null)
  useEffect(() => {
    const filteredPopular = products?.filter(
      (item) => item.category === 'micraphone'
    )
    const filteredBest = products?.filter(
      (item) => item.category === 'mouse'
    )
    const filteredwireless = products?.filter(
      (item) => item.category === 'wireless'
    )
    const filteredmobile = products?.filter(
      (item) => item.category === 'mobile'
    )
    const filteredwatches = products?.filter(
      (item) => item.category === 'watch'
    )
    const filteredGuitar = products?.filter(
      (item) => item.category === 'guitar'
    )
    setMicraphone(filteredPopular)
    setHeadphones(filteredBest)
    setWireless(filteredwireless)
    setMobile(filteredmobile)
    setWatches(filteredwatches)
    setGuitar(filteredGuitar)
  }, [products])


  return (
    <div className={styles.home}>
      <Slider />
      <Services />
      <h1 className={styles.product_name}>Microphones</h1>
      <ProductList data={micraphone} />
      <h1 className={styles.product_name}>Mouses</h1>
      <ProductList data={headphones} />
      <Timer />
      <h1 className={styles.product_name}>Headphones</h1>
      <ProductList data={wireless} />
      <ProductList data={mobile} />
      <h1 className={styles.product_name}>Watches</h1>
      <ProductList data={watches} />
      <h1 className={styles.product_name}>Guitars</h1>
      <ProductList data={guitar} />

    </div>
  )
}

export default Home