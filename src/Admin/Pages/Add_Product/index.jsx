import React, { useRef, useState } from 'react'
import styles from './styles.module.scss'
import Select from '../../../UI_Design/SelectOption'
import DownloadPhoto from '../../../UI_Design/DownloadPhoto'
import { MdAddAPhoto } from 'react-icons/md'
import { db, storage } from '../../../Firebase/config'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../Components'
import { v4 as uuidv4 } from 'uuid';

const AddProduct = () => {
  // Oybekjon
  const [fileUrl, setFileUrl] = useState(null)
  // ~~~~~ Products's States ~~~~~~~~~//
  const [name, setName] = useState("")
  const [shortDesc, setShortDesc] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState()
  const [productImg, setProductImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const id = uuidv4()
  // ~~~~~~~~~~~ Functions ~~~~~~~~~~//
  // const addProduct = async  e => {
  //   e.preventDefault()
  //   setLoading(true)

  //   try {

  //     const docRef =  await collection(db, "products")
  //     const storageRef = ref(storage, `productImages/${Date.now() + fileUrl.name}`)
  //     const uploadTask = uploadBytesResumable(storageRef, fileUrl)


  //     uploadTask.on(
  //       () => {
  //         toast.error("Image not upload");

  //       },
  //         async () => {
  //         try {



  //           const data =   {              
  //             name: name,
  //             shortDesc: shortDesc,
  //             description: description,
  //             category: category,
  //             price: price,
  //           }

  //           const downloadURL = await  getDownloadURL(uploadTask.snapshot.ref)
  //          const setData =   {...data,downloadURL}

  //         await  addDoc(docRef, setData)
  //           setName('')
  //           setCategory('')
  //           setPrice('')
  //           setShortDesc('')
  //           setDescription('')
  //           setFileUrl(null)

  //         } catch (error) {
  //         }

  //       })



  //     setLoading(false)
  //     toast.success("Product successfully added!")
  //     navigate('/dashboard/all-products')
  //   } catch (error) {
  //     // toast.error("Product not added")
  //   }


  // }

  const addProduct = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      // Reference to the Firestore collection
      const docRef = await collection(db, "products");

      // Reference to the Cloud Storage location for uploading the image
      const storageRef = ref(storage, `productImages/${Date.now() + fileUrl.name}`);

      // Upload the image file
      const uploadTask = uploadBytesResumable(storageRef, fileUrl);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "products",

        (snapshot) => {
        },
        (error) => {
        },
        async () => {
          try {
            // Data to be added to Firestore
            const data = {
              ID: id,
              name: name,
              shortDesc: shortDesc,
              description: description,
              category: category,
              price: price,
              likeCount:[],
              reviews: [
                {
                  rating: 4.8,
                  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                },
                {
                  rating: 4.8,
                  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                },
              ],
              avgRating: 4.7,
            };

            // Get the download URL for the uploaded image
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Add the download URL to the data
            const setData = { ...data, downloadURL };

            // Add the data to Firestore
            await addDoc(docRef, setData);

            // Clear form fields after successful addition
            setName('');
            setCategory('');
            setPrice('');
            setShortDesc('');
            setDescription('');
            setFileUrl(null);

            // Notify user and navigate
            toast.success("Product successfully added!");
            navigate('/dashboard/all-products');
            setLoading(false)
          } catch (error) {
            // Handle any errors that occurred during data addition
            toast.error("Failed to add product");
          } finally {
            // Make sure to set loading state to false
            setLoading(false);
          }
        }
      );
    } catch (error) {
      // Handle any errors that occurred before upload
      toast.error("Failed to add product");
      setLoading(false); // Make sure to set loading state to false
    }
  };




  const handleFilter = (e) => {
    setCategory(e.target.value)
  }

  const fileInputRef = useRef(null);
  const actives = () => {
    fileInputRef.current.click();
  };



  return (
    <>
      {
        loading && <Loader />
      }
      <div className={styles.add_product}>
        <form onSubmit={addProduct}>
          <h1>Add Product</h1>
          <div className={styles.inputs}>
            <label> Product Name </label>
            <input type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="text" required />
          </div>
          <div className={styles.inputs}>
            <label>Short Description</label>
            <input type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              name="text" required />
          </div>
          <div className={styles.inputs}>
            <label>Description</label>

            <input type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="text" required />
          </div>
          <div className={styles.inputs}>
            <label>Price</label>

            <input type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="text"
              placeholder='UZS' required />
          </div>
          <div className={styles.select_photo}>
            <div className={styles.categories}>
              {/* <label>Category</label> */}


              <Select handleFilter={handleFilter} />
            </div>
            <div className={styles.photoDown}>
              <div className={styles.file_input}>
                <div className={styles.choose_file} onClick={actives}>
                  <MdAddAPhoto size={25} className={styles.camera} />
                  <span>Download Photo</span>
                </div>
                <input ref={fileInputRef}
                  onChange={(e) => setFileUrl(e.target.files[0])}
                  type='file' required
                />

              </div>
            </div>
          </div>
          <div className={styles.add_product_btn}>
            <button type='submit'>Add Product</button>

          </div>
        </form>
      </div>
    </>
  )
}

export default AddProduct