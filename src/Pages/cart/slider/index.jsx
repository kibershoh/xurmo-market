//~~~~~~~~~React Hooks~~~~~~~
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

//~~~~~~~~~~Icons~~~~~~~~~~~~~
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

//~~~~~~~~~~~~Styles~~~~~~~~~~~~
import styles from './styles.module.scss'


const CartSlider = ({images}) => {

  const slideLength = images?.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  //~~~~~~~~~~~~~~AutoScroll~~~~~~~~~~~~~~
  const autoScroll = true
  let slideInterval;
  let intervalTime = 10000;

  // ~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
  }
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
  }

  //~~~~~~~~~~~~~~useEffects()~~~~~~~~~~~~~~
  useEffect(() => {
if(images){
      setCurrentSlide(0)

}
  },[])
  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      }
      auto()
    }
    return () => clearInterval(slideInterval)
  }, [])
  
  
  return (
    <div className={styles.slider}>
    
      {
        images?.map((image, inx) => {
          return (
            <div className={clsx(styles.slide,
              inx === currentSlide ? styles.current : ''
            )}
              key={inx}
            >
              {
                inx === currentSlide && (
                  <>
                    <img src={image} alt="" />
                    
                                      </>
                )
              }

            </div>
          )
        })
      }
       <div className={styles.next_prev_icons}>
        <AiOutlineArrowLeft  className={clsx(
        styles.arrow,
        styles.prev
      )} onClick={prevSlide} />
      <AiOutlineArrowRight className={clsx(
        styles.arrow,
        styles.next
      )} onClick={nextSlide} />
       </div>
    </div>
  )
}

export default CartSlider