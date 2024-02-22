import React, { useState } from 'react';
import {Footer, Navbar} from './Components/index';
 import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './Routes/Routers';
import { useLocation } from 'react-router-dom';
import { NavbarAdmin } from './Admin/Components';
import { Box, Tab } from '@mui/material';
import { Tabs } from 'rsuite';
import { TabPanel } from '@mui/lab';
function App() {   
 const location = useLocation()
const [value, setValue] = useState(0);

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
     autoClose={500}
     theme='dark'
     closeOnClick
     pauseOnHover={false}
     />


     {
      location.pathname.startsWith("/dashboard") ? <NavbarAdmin/> : <Navbar/>
     }
    <div>
      <Routers/>
    </div>
    <Footer/>

    </div>
  );
}

export default App;
