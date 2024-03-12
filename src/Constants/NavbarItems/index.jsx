import {RiMenu2Fill } from "react-icons/ri";
import {AiOutlineDashboard} from "react-icons/ai";
import UseAuth from "../../Custom Hooks/UseAuth";
import { useLocation } from "react-router-dom";
export const navLinks = [
  {
    id: 1,  
    title: "Home",
    path: '/',
  },
  {
    id: 2,
    title: "Shop",
    path: '/shop',
  },
  {
    id: 3,
    title: "My Orders",
    path: '/my_orders',
  },
  
   
  
  
  

];
export default navLinks;
