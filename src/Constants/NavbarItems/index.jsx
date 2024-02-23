import {RiMenu2Fill } from "react-icons/ri";
import {AiOutlineDashboard} from "react-icons/ai";
import UseAuth from "../../Custom Hooks/UseAuth";
// const {currentUser} = UseAuth()
// const auth = currentUser?.displayName === "Oybek" || currentUser?.email === "oybek@gmail.com"
export const navLinks = [
  {
    id: 1,  
    title: "Home",
    path: '/',
    icon: AiOutlineDashboard,
  },
  {
    id: 2,
    title: "Shop",
    path: '/shop',
    icon: RiMenu2Fill,
  },
  
  
  
  

];
export default navLinks;
