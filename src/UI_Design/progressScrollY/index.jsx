import React, { useEffect, useState } from 'react'
import { useScroll } from '../../Components/Navbar/useScroll'

const ProgressScrollY = () => {
  const [scrollProsent,setScrollProsent] = useState(0)
  
  useEffect(()=>{
    const handleScroll = ()=>{
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollY = window.scrollY;
       
        const ScrollProsent = (scrollY/(documentHeight-windowHeight))*100
        setScrollProsent(ScrollProsent)
    }  
    
    
    window.addEventListener("scroll",handleScroll)
    return ()=>{
        window.removeEventListener("scroll",handleScroll)
    }
},[])
  
const {scrollDirection} = useScroll()

  return (
    <div id='progress-container'
     style={{
        zIndex:999,
        display: scrollDirection === "down" ?  'none' : 'block',
        height:"8px",
        width:"100%",
        backgroundClor:'transparent',
        position:"fixed",
        top:"0",
        left:"0",
        right:"0",
    }}
    >
        <div className='progress_fill' style={{
            height:'100%',
            backgroundImage:'linear-gradient(to right, #580ed0 0%, #500ed0 51%, #580ed0 100%)',
            width:`${scrollProsent}%`
        }}>
            

        </div>
   
    </div>
  )
}

export default ProgressScrollY