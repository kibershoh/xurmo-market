//--------------- Library---------------//

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
// -----------React-icons-----------//

import { HiMenuAlt1, HiViewGrid } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";

//----------------Files---------------- //

import userImg from '../../../assets/loginn.png'
import logout from '../../../assets/logoutt.png'
import logotip from '../../../assets/logotip.png'
import styles from './styles.module.scss'
// ----------- Firebase ------------------//
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import UseAuth from "../../../Custom Hooks/UseAuth";
import MotionText from "../../../Constants/Framer-Motions/ForNavbar/logo";
import { auth } from "../../../Firebase/config";

// ~~~~~~~~~~~ React Icons~~~~~~~~~~~ //
import { MdFormatListBulleted, MdLibraryAdd, MdOutlineSettings } from "react-icons/md";
import { FaBars, FaCalendarDay, FaRegBell, FaStaylinked, FaUsers } from "react-icons/fa6";
import { IoCloseOutline, IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { LuWarehouse } from "react-icons/lu";
import { BsFillAirplaneFill } from "react-icons/bs";
import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import { useScroll } from "../../../Components/Navbar/useScroll";
import HideLink, { ShowOnLogout } from "../../../Components/HideLink";
import useGetData from "../../../Custom Hooks/UseGetData";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Box, Modal } from "@mui/material";


// ~~~~~~~~~~~ Components~~~~~~~~~~~ //





const NavbarAdmin = () => {
  const location = useLocation()
  // ~~~~~~Protected Route and firebase auth~~~~~//
  const { currentUser } = UseAuth()
  
  const {data:orders} = useGetData('orders')
const [newOrder,setNewOrder] = useState([])
  useEffect(()=>{
    const newOrders = orders.filter((item)=>!item.sent)
    setNewOrder(newOrders)
  },[orders])

  // All States
  const [active, setActive] = useState(false)
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [authLinks, setAuthLinks] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  // Functions//

  //  for Login and Register
  const ProfileHandler = () => {
    setActive(!active)
  }

  // for Sidebar
  const showClick = () => {
    setShow(!show)
  }


  // Active Link Handler


  // Refs
  const ProfileRef = useRef(null);
  const navbarRef = useRef(null)

  // //-----------useEffects()--------------//

  // // For Navbar and Sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ProfileRef.current &&
        !ProfileRef.current.contains(event.target)
      ) {
        setActive(false);
        setSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })
 

  // // -------------------FIREBASE---------------------------Logout------------//

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logged out successfully")
      navigate('/')
      setActive(false)
    }).catch((error) => {
      toast.error(error.message)
    })
  }

  // // --------------------Redux-------------------//
  // const dispatch = useDispatch()

  // const totalQuantity = useSelector(state => state.cart.totalQuantity)







  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const activeLinkHandler = (title) => {
    setActiveLink(title)
    document.title = title
    setSidebar(false)
  }

  console.log(location.pathname.startsWith());
  const { scrollX, scrollY, scrollDirection } = useScroll();

  const data = [
    {
      id: 1,
      icon: <HiViewGrid size={17} className={styles.icons} />,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      id: 2,
      icon: <FaStaylinked size={17} className={styles.icons} />,
      name: "All Products",
      path: "/dashboard/all-products",
    },



    {
      id: 3,
      icon: <FaUsers size={17} className={styles.icons} />,
      name: "Users",
      path: "/dashboard/users",
    },
    {
      id: 4,
      icon: <MdLibraryAdd size={17} className={styles.icons} />,
      name: "Add Products",
      path: "/dashboard/add-products",
    },
    {
      id: 4,
      icon: <MdFormatListBulleted size={17} className={styles.icons} />,
      name: "Order List",
      path: "/dashboard/order-lists",
    },
    {
      id: 5,
      icon: <MdFormatListBulleted size={17} className={styles.icons} />,
      name: "Categories",
      path: "/dashboard/categories",
    },


  ];
  const { data: productsData, loading } = useGetData("products")
  const [searchedProducts, setSearchedProducts] = useState([])
  const [inputText, setInputText] = useState('')

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const searchedProducts = productsData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchedProducts(searchedProducts)
    setInputText(searchTerm)

  }
  

  // ~~~~~~~~~~~Modal~~~~~~~~~~~~~
   // ~~~~~~~~~~~~~~~~Modal Items ~~~~~~~~~~~~~//
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const styleBox = {
    position: 'absolute',
    right:'2%',
     
    // transform: {
    //   xs: 'translate(100%, 100%)',
    //   sm: 'translate(100%, 100%)'
    // },
    marginLeft:'auto',
    width: {
      xs: '90%',
      sm: '30%',
    },
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    pb: 1,
    border: '1px solid white',
    outline: 'none',
    
    
  };
  const styleModal = {
    zIndex:'10001',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100vh',
    padding:'20px'
  }
  return (
    <>
<Modal
        keepMounted
        open={open}
        onClose={handleClose}
        sx={styleModal}
      >
        <Box sx={styleBox}>
          <div className={styles.note_modal}>
           <div className={styles.close_icon}>
          
          <IoCloseOutline size={21}/>

           </div>
             
             <hr />
             
          </div>
             
        </Box>

      </Modal>


      <div ref={ProfileRef} className={clsx(
        styles.navbar,
        scrollDirection === "down" || scrollDirection === undefined || scrollY === undefined ? styles.showNav : (scrollY > 0 ? styles.hiddenNav : ' '),

      )}>
        <Link to='#' className={styles.menu_bars}>
          <HiMenuAlt1 size={25} onClick={showSidebar} />
        </Link>
        <div className={styles.search_admin}>
          <input type="search" placeholder="Search...." onChange={handleSearch} />
          <IoSearchOutline className={styles.search_icon} />
        </div>
        {
          inputText !== '' && searchedProducts?.length !== 0 &&
          <div className={styles.searched_products}>

            <div className={styles.names}>
              {
                inputText !=='' && searchedProducts?.map((item, index) => (
                  <Link key={index} to={/shop/ + item.ID}><BiSearchAlt2 size={20} /> <span>{item.name}</span></Link>
                ))
              }
            </div>
          </div>
        }
        <div className={styles.admin_auth}>
          {/* -----------Cart----------- */}

          <div className={styles.cart}>
            <a href="#cart">
              <IoMdNotificationsOutline size={25} className={styles.notifacation_icon}
                onClick={handleOpen}
              />
              <span>
                {newOrder.length}
              </span>
            </a>
          </div>
          {/* -----------Profile----------- */}

          <div className={styles.profile}>

            <HideLink>

              <h1>
                Hi {currentUser.displayName}
              </h1>


            </HideLink>
            <button className={styles.btn_profile} onClick={ProfileHandler} >
              {
                <img src={currentUser ? currentUser?.photoURL : userImg} alt="" />
              }


            </button>
            {/* -----------Authentication------------ */}
            <div className={
              clsx(
                styles.auth_modal,
                active ? styles.block : styles.hidden
              )
            }>
              <h1>{currentUser?.displayName}</h1>
              <p>{currentUser?.email}</p>
              <div className={styles.links_auth}>
                <span className={styles.links}>

                  <ShowOnLogout>
                    <Link
                      onClick={() => {
                        setAuthLinks('My Orders')
                        setActive(false)
                      }}

                      className={clsx(
                        authLinks === 'My Orders' ? styles.authActiveLinks : ''
                      )} to={"/order-history"}>My Orders</Link>
                  </ShowOnLogout>

                  <ShowOnLogout>
                    <Link
                      onClick={() => {
                        setAuthLinks('Register')
                        setActive(false)
                      }}

                      className={clsx(
                        authLinks === 'Register' ? styles.authActiveLinks : ''
                      )} to={"/register"}>Register</Link>

                    <Link
                      onClick={() => {
                        setAuthLinks('Login')
                        setActive(false)

                      }}

                      className={clsx(
                        authLinks === 'Login' ? styles.authActiveLinks : ''
                      )} to={"/login"}>Login</Link>
                  </ShowOnLogout>

                  <HideLink>
                    <button
                      onClick={logoutUser}
                      className={styles.logout}
                    >Logout <img src={logout} width={10} alt="" /> </button>
                  </HideLink>

                </span>
              </div>
            </div>
          </div>
        </div>




      </div>
      {/* ~~~~~~~~~~~Responsive Sidebasr */}
      <nav
        ref={ProfileRef}
        className={clsx(
          styles.navLeft,
          sidebar ? styles.active : ''
        )}
      >
        <div className={styles.navMenu}>
          <Link to={'/'}>
            <span>Xurmo</span>
          </Link>
          <img src={logotip} width={30} alt="" />
          <CgClose size={30} className={styles.faTimes} onClick={showSidebar} />
        </div>
        <ul>
          {
            data?.map(({ id, name, icon, path }, inx) => (
              <li key={inx}>
                <NavLink to={path} className={clsx(
                  activeLink === name ? styles.active : '',
                )}
                  onClick={() => {
                    activeLinkHandler(name)

                  }}
                >
                  {icon}
                  {name}
                </NavLink>
              </li>
            ))
          }


        </ul>
      </nav>
    </>
  )
}

export default NavbarAdmin