import React, { useState } from 'react';
import {Footer, Navbar} from './Components/index';
 import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './Routes/Routers';
import { useLocation } from 'react-router-dom';
import { NavbarAdmin } from './Admin/Components';
function App() {   
 const location = useLocation()

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
