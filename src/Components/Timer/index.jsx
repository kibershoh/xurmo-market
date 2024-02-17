import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
const Timer = () => {
  // States
  const [days, setDays] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()
  let interval;
  const countDown = () => {
    const dedline = new Date('March 3, 2024').getTime()
    interval = setInterval(() => {
      const now = new Date().getTime()
      const Timedifference = dedline - now
      const days = Math.floor(Timedifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(Timedifference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
      const minutes = Math.floor(Timedifference % (1000 * 60 * 60) / (1000 * 60))
      const seconds = Math.floor(Timedifference % (1000 * 60) / 1000)

      if (dedline < 0) clearInterval(interval.current)
      else {
        setDays(days)
        setHours(hours)
        setMinutes(minutes)
        setSeconds(seconds)
      }
    })
  }
  useEffect(() => {
    countDown()
  })
  return (
    <div className={styles.timer}>
      <div className={styles.about_limit}>
        <h1>Special offer!</h1>
        <p>
          For a limited time only, you can get incredible discounts on our products that you won't want to miss
        </p>
      </div>
      <div className={styles.dates}>
        <div>
          <h2>{days}</h2>
          <p>DAYS</p>
        </div>
        <div>
          <h2>{hours}</h2>
          <p>HOURS</p>
        </div>
        <div>
          <h2>{minutes}</h2>
          <p>MINUTES</p>
        </div>
        <div>
          <h2>{seconds}</h2>
          <p>SECONDS</p>
        </div>
      </div>
    </div>
  )
}

export default Timer