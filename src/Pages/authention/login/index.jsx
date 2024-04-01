// Routes and React librar
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FcGoogle } from "react-icons/fc";

// Styles library
import { toast } from 'react-toastify'
import styles from './style.module.scss'

// Firebase library
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../Firebase/config'
import { Loader } from '../../../Components'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';


const Login = () => {
    //  ------------------ States ------------------ //
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

    //  ------------------ Functions ------------------ //

    const loginUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setShowPassword(false)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            console.log(user);
            setIsLoading(false)
            toast.success("Successfully logged in ")
            if (user.displayName === "Admin") {
                navigate('/dashboard')
            }
            else {
                navigate('/')
            }
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }

    }
     const showHide = () => {
        setShowPassword(!showPassword)
    }
    // -------------------- Login With Google-------------//
   
    return (
        <>
            {isLoading && <Loader />}

            <div className={styles.login}>
                <form onSubmit={loginUser}>
                    <h1 className={styles.title}>Login</h1>

                    <div className={styles.input_div}>

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email' placeholder='Your Email'
                            required
                        />
                        <label>Your Email</label>
                    </div>

                    <div className={styles.input_div}>
                        <input
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                            type={
                                showPassword ? 'text' : 'password'
                            }
                            placeholder='Password'
                        />
                        <label>Password</label>
                        <button onClick={showHide} className={styles.eye_show_hide}>
                            {
                                !showPassword ?
                                    <IoEyeOffOutline size={20} className={styles.eye_icon} />
                                    :
                                    <IoEyeOutline size={20} className={styles.eye_icon} />

                            }
                        </button>
                    </div>

                    <button type="submit" className={styles.login_btn}>
                        Login
                    </button>
                    <Link className={styles.reset_btn} to={'/reset'}>Reset password</Link>

                    <p>Don't have an account? <Link to={'/register'}> Create account</Link></p>

                </form>
            </div>

        </>

    )
}

export default Login;
