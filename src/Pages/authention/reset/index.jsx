// Routes and React library
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Styles library
import styles from '../login/style.module.scss'
import { toast } from 'react-toastify'

// Firebase library
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../Firebase/config'
import { Loader } from '../../../Components'


const Reset = () => {
    // ---------States ----------- //
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    // ---------Functions ------ Reset password //   
    const resetPassword = (e) => {
        e.preventDefault()
        setIsLoading(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success("Check your email for a reset link")
            }).catch((error) => {
                setIsLoading(false)
                toast.error(error.message)

            })
    }




    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.login}>
                <form onSubmit={resetPassword}>

                    <div className={styles.input_div}>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            type='email' placeholder='Email'
                        />
                        <label> You Email</label>

                    </div>


                    <button className={styles.login_btn} type="submit">
                        Reset Password
                    </button>

                    <div className={styles.login_register_btn} >
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>

                    </div>
                </form>
            </div>

        </>

    )
}

export default Reset;