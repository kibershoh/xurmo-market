import React, { useEffect, useState } from 'react'
import { Header, Services, Timer } from '../../Components'
import styles from './styles.module.scss'
import { ProductList } from '../../UI_Design'
import useGetData from '../../Custom Hooks/UseGetData'
import { useScroll} from 'framer-motion'
const Home = () => {
    const { scrollYProgress } = useScroll();
    const { data: productsData } = useGetData("orders")
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
    <div
    className={styles.home}>
      <Header/>
      <Services />
      {
        micraphone?.length !==0 && 
      <h1 className={styles.product_name}>Microphones</h1>
      }
      <ProductList data={micraphone} />
       {
        headphones?.length !==0 && 
      <h1 className={styles.product_name}>Mouse</h1>
      }
      <ProductList data={headphones} />
      <Timer />
       {
        wireless?.length !==0 && 
      <h1 className={styles.product_name}>Wireless</h1>
      }
      <ProductList data={wireless} />
       {
        mobile?.length !==0 && 
      <h1 className={styles.product_name}>Mobile</h1>
      }
      <ProductList data={mobile} />
      {
        watches?.length !==0 && 
      <h1 className={styles.product_name}>Watches</h1>
      }
      <ProductList data={watches} />
       {
        guitar?.length !==0 && 
      <h1 className={styles.product_name}>Guitar</h1>
      }
      <ProductList data={guitar} />

    </div>
  )
}

export default Home