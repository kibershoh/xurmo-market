import React, { useEffect, useState } from 'react';
import {Footer, Navbar, NavbarDown} from './Components/index';
 import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './Routes/Routers';
import { useLocation } from 'react-router-dom';
import { NavbarAdmin } from './Admin/Components';
import { Box, Tab } from '@mui/material';
import { Tabs } from 'rsuite';
import { TabPanel } from '@mui/lab';
import UseAuth from './Custom Hooks/UseAuth';
import image from './assets/bglogin.jpg'
import ProgressScrollY from './UI_Design/progressScrollY';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import clsx from 'clsx'
import Dropdown from './Components/Dropdown';
function App() {   
 const location = useLocation()
const [value, setValue] = useState(0);
const {currentUser} = UseAuth()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

  return (
    <div>
    <ToastContainer
     autoClose ={500}
     theme='dark'
     closeOnClick
     pauseOnHover={false}
     />
     <ProgressScrollY/>

     {
      location.pathname.startsWith("/dashboard") && currentUser?.displayName==='Oybek' && currentUser ? <NavbarAdmin/> 
      :
       <>
      <Navbar/>
      <NavbarDown/>
      </>
     }
    <div>
      <Routers/>
    </div>
   {
      location.pathname.startsWith("/dashboard") && currentUser?.displayName==='Oybek' && currentUser ? ''

      :
       <Footer/>
     }
    
    </div>
  );
}

export default App;
