// ------------Routes and React library------------//
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ------------Styles library-------------//
import { MdAddAPhoto } from "react-icons/md";

// ------------Styles library-------------//
import styles from '../login/style.module.scss'
import { toast } from 'react-toastify';

// ------------Firebase library-------------//
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../../Firebase/config';
import { Loader } from '../../../Components';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import DownloadPhoto from '../../../UI_Design/DownloadPhoto';





const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [fileUrl, setFileUrl] = useState(null)
  const navigate = useNavigate()
  const registerUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    // ~~~~~~~~~~with try catch ~~~~~~~~~~~~~//

    if (fileUrl !== null) {

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const storageRef = ref(storage, `images/${Date.now() + username}`);
        const UploadTask = uploadBytesResumable(storageRef, fileUrl);

        UploadTask.on(() => {
          toast.error('Error')
        },

          async () => {
            try {
              const downloadUrl = await getDownloadURL(UploadTask.snapshot.ref);

              await updateProfile(user, {
                displayName: username,
                photoURL: downloadUrl,
              });

              await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: username,
                email,
                photoURL: downloadUrl,
              });
            } catch (error) {

            }

          }

        );
        setLoading(false)
        navigate('/login')

        toast.success('Accaunt created')
      } catch (error) {
        setLoading(false)
        toast.error('Bitta narsada oxirida');
        console.error(error);
      }

    }
    else {
      setLoading(false)
      toast.error("Qaysidir maydon bo'sh iltimos toldiring")
    }
  }

  const fileInputRef = useRef(null);
  const actives = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {loading && <Loader />}

      <div className={styles.login}>
        <form onSubmit={registerUser}>
          <h1 className={styles.title}>Register</h1>

          <div className={styles.input_div}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required

              type='text'
              placeholder='Username'
            />
            <label>Username</label>
          </div>

          <div className={styles.input_div}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type='email'
              placeholder='Your Email'
            />
            <label>Your Email</label>
          </div>

          <div className={styles.input_div}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type='password'
              placeholder='Password'
            />
            <label>Password</label>
          </div>

          <div className={styles.file_input}>
            <div className={styles.choose_file} onClick={actives}>
              <MdAddAPhoto size={25} className={styles.camera} />
              <span>Download Photo</span>
            </div>
            <input ref={fileInputRef}
              onChange={(e) => {
                setFileUrl(e.target.files[0])
              }}
              type='file'
            />

          </div>

          <button className={styles.login_btn} type="submit">
            Register
          </button>


          <p>Already an account? <Link to={'/login'}> Login</Link></p>

        </form>
      </div>
    </>


  )
}

export default Register;