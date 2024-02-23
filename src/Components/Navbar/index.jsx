//--------------- Library---------------//

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
// -----------React-icons-----------//

import { HiMenuAlt1 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineDashboard } from "react-icons/ai";

//----------------Files---------------- //

import navLinks from "../../Constants/NavbarItems";
import userImg from '../../assets/loginn.png'
import logout from '../../assets/logoutt.png'
import dashboard from '../../assets/dashboard.png'

import styles from './style.module.scss'
import MotionText from "../../Constants/Framer-Motions/ForNavbar/logo";

// ----------- Firebase ------------------//
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../Firebase/config'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import HideLink, { ShowOnLogout } from "../HideLink";
import UseAuth from "../../Custom Hooks/UseAuth";

// Components





const Navbar = () => {
    // ~~~~~~Protected Route and firebase auth~~~~~//

    const { currentUser } = UseAuth()



    // All States
    const [active, setActive] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    const [show, setShow] = useState(false)
    const [activeLink, setActiveLink] = useState('')
    const [authLinks, setAuthLinks] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [photoURL, setPhotoUrl] = useState(null)
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
    const activeLinkHandler = (title) => {
        setActiveLink(title)
        document.title = title
    }

    // Refs
    const ProfileRef = useRef(null);
    const navbarRef = useRef(null)

    //-----------useEffects()--------------//

    // For Navbar and Sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                ProfileRef.current &&
                !ProfileRef.current.contains(event.target)
            ) {
                setActive(false);
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    })

    // Scrolled
    useEffect(() => {
        const handleScroll = () => {

            const scrollTop = window.scrollY;
            if (scrollTop > 200) {
                setScrolled(true);
            }
            else {
                setScrolled(false)
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // -------------------FIREBASE---------------------------Logout------------//

    const logoutUser = () => {
        signOut(auth).then(() => {
            toast.success("Logged out successfully")
            navigate('/')
            setActive(false)
        }).catch((error) => {
            toast.error(error.message)
        })
    }




    // --------------------Redux-------------------//
    const dispatch = useDispatch()

    const totalQuantity = useSelector(state => state.cart.totalQuantity)






    return (
        <nav
            ref={ProfileRef}
            className={clsx(styles.header,
                scrolled ? styles.scrolled : styles.unscrolled,
            )}>
            {/* -----------Desktop Navbar----------- */}
            <div className={styles.navbar}>
                <Link to={'/'} className={styles.logo}>
                    <MotionText logo={"Xurmo"} />
                </Link>
                <HiMenuAlt1 onClick={showClick} size={25} className={styles.menu_icon} />
                    {
                        currentUser?.displayName === "Oybek" && currentUser && currentUser?.email === "oybek@gmail.com" ? (<button className={styles.dashboard_page}><Link className={styles.unActiveLink} to={'/dashboard'}>Dashboard </Link> <img src={dashboard} alt="" /></button>  ) : ''
                    }
                <nav>

                    {/* -----------Navbar Links----------- */}
                    <ul>
                        {
                            navLinks.map((nav, inx) => (
                                <li key={nav.id}>
                                    <Link classes={clsx(
                                        activeLink === nav.title ? styles.activeLink : '', styles.unActiveLink
                                    )}
                                        onClick={() => activeLinkHandler(nav.title)} to={nav.path}
                                    >
                                        <MotionText
                                            logo={nav.title}
                                            classes={clsx(
                                                activeLink === nav.title ? styles.activeLink : '', styles.unActiveLink
                                            )} />
                                    </Link>
                                </li>
                            ))
                        }

                    </ul>
                    {/* -----------Cart----------- */}

                    <div className={styles.cart}>
                        <a href="#cart">
                            <AiOutlineShoppingCart size={25} className={styles.icon_shop}
                                onClick={() => {
                                    navigate('/cart')
                                    document.title = 'Cart';
                                }}
                            />
                            <span>
                                {totalQuantity}
                            </span>
                        </a>
                    </div>
                    {/* -----------Profile----------- */}

                    <div className={styles.profile} ref={ProfileRef}>

                        <HideLink>
                            <h1>
                                <MotionText logo={currentUser ? `Hi ${currentUser.displayName}` : ''} />
                            </h1>
                        </HideLink>
                        <button className={styles.btn_profile} onClick={ProfileHandler} >
                            {
                                <img src={currentUser ? currentUser.photoURL : userImg} alt="" />
                            }


                        </button>
                        {/* -----------Authentication------------ */}
                        <div className={
                            clsx(
                                styles.auth_modal,
                                active ? styles.block : styles.hidden
                            )
                        }>
                            <h1>{displayName}</h1>
                            <p>{email}</p>
                            <div className={styles.links_auth}>
                                {/* <IoCaretUpSharp size={17} className={styles.top_icon} /> */}
                                <span className={styles.links}>

                                    <HideLink>
                                        <Link
                                            onClick={() => {
                                                setAuthLinks('My Orders')
                                                setActive(false)
                                            }}

                                            className={clsx(
                                                authLinks === 'My Orders' ? styles.authActiveLinks : ''
                                            )} to={"/order-history"}>My Orders</Link>
                                    </HideLink>

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
                </nav>

            </div>

            {/* -----------Sidebar Responsive------------ */}

            <div className={clsx(styles.sidebar, show ? styles.right : styles.left)}
                ref={ProfileRef}>
                <div className={styles.logo_close}>
                    <Link to={'/'} className={styles.logo}>
                        <MotionText logo={"Xurmo"} classes={''} />
                    </Link>
                    <CgClose onClick={showClick} className={styles.close_btn} size={22} />
                </div>

                {/* -----------Sidebar Links------------ */}
                <ul>
                    {
                        navLinks.map((nav) => (
                            <li key={nav.id}>
                                <Link
                                    to={nav.path}
                                    onClick={() => {
                                        activeLinkHandler(nav.title)
                                        setShow(false)
                                    }}
                                    className={clsx(
                                        activeLink === nav.title ? styles.activeLink : ''
                                    )}
                                >
                                    {nav.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar