//React Hooks
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

//Icons
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

//Styles
import styles from './style.module.scss'
import { sliderData } from '../../Constants/data/Slider'


const Slider = () => {

  const slideLength = sliderData.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  //AutoScroll
  const autoScroll = true
  let slideInterval;
  let intervalTime = 3000;

  // Functions
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
  }
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
  }

  // useEffects()
  useEffect(() => {
    setCurrentSlide(0)

  }, [])
  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      }
      auto()
    }
    return () => clearInterval(slideInterval)
  }, [currentSlide, autoScroll, slideInterval])
  return (
    <div className={styles.slider}>
      <AiOutlineArrowLeft className={clsx(
        styles.arrow,
        styles.prev
      )} onClick={prevSlide} />
      <AiOutlineArrowRight className={clsx(
        styles.arrow,
        styles.next
      )} onClick={nextSlide} />

      {
        sliderData.map((slide, inx) => {
          const { image, heading, desc } = slide
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
                    <div className={styles.content}>
                      <h2>{heading}</h2>
                      <p>{desc}</p>
                      <hr />
                      <button>
                        Shop Now
                      </button>

                    </div>
                  </>
                )
              }

            </div>
          )
        })
      }
    </div>
  )
}

export default Slider