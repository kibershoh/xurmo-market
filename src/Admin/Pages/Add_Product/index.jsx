import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import Select from '../../../UI_Design/SelectOption';
import { MdAddAPhoto } from 'react-icons/md';
import { db, storage } from '../../../Firebase/config';
import { toast } from 'react-toastify';
import { FieldValue, Timestamp, addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../Components';
import { v4 as uuidv4 } from 'uuid';
import UseAuth from '../../../Custom Hooks/UseAuth';
import { Time } from '../../../Constants/date';
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsArrowLeft } from 'react-icons/bs';

const AddProduct = () => {
  const { currentUser } = UseAuth()
  console.log(currentUser);
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const id = uuidv4();

  const addProduct = async (e) => {
    e.preventDefault();

    if (files.length > 4) {
      toast.error("Rasm limitdan oshib ketgan")
    }
    else {
      try {
        const docRef = collection(db, 'products');

        const uploadTasks = files.map((file) => {
          const storageRef = ref(storage, `productImages/${Date.now()}_${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file)
              uploadTask.on('state_changed', (snapshot)=>{
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgressBar(progress);
              });
          return uploadTask
        });

        Promise.all(uploadTasks).then(async (snapshots) => {
          const downloadURLs = await Promise.all(snapshots.map((snapshot) => getDownloadURL(snapshot.ref)));

          const data = {
            ID: id,
            name: name,
            shortDesc: shortDesc,
            description: description,
            category: category,
            price: price,
            dateExample: Time,
            user: {
              userName: currentUser?.displayName,
              userImg: currentUser?.photoURL,
            },

            likeCount: [],
            reviews: [
              {
                rating: 4.8,
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
              },
              {
                rating: 4.8,
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
              },
            ],
            avgRating: 4.7,
            downloadURLs: downloadURLs,
          };

          await addDoc(docRef, data);

          setName('');
          setCategory('');
          setPrice('');
          setShortDesc('');
          setDescription('');
          setFiles([]);
          console.log(data);
          toast.success('Product successfully added!');
          navigate('/dashboard/all-products');
        });
      } catch (error) {
        toast.error('Failed to add product');
      }
    }
  };

  const handleFilter = (e) => {
    setCategory(e.target.value);
  };

  const fileInputRef = useRef(null);
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };
console.log(progressBar);
  return (
    <>
      {loading && <Loader />}
      <div className={styles.add_product}>
        <form onSubmit={addProduct}>
            <button className={styles.back}  onClick={()=>navigate('/dashboard/all-products')}>
              <BsArrowLeft   size={28}/>
            </button>
          <div className={styles.inputs}>
            <label> Product Name </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="text" required />
          </div>
          <div className={styles.inputs}>
            <label>Short Description</label>
            <input type="text" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} name="text" required />
          </div>
          <div className={styles.inputs}>
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="text" required />
          </div>
          <div className={styles.inputs}>
            <label>Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} name="text" placeholder='UZS' required />
          </div>
          <div className={styles.select_photo}>
            <div className={styles.categories}>
              <Select handleFilter={handleFilter} />
            </div>
            <div className={styles.photoDown}>
              <div className={styles.file_input}>
                <div className={styles.choose_file} onClick={openFilePicker}>
                  <MdAddAPhoto size={25} className={styles.camera} />
                  <span>Download Photo</span>
                </div>
                <input ref={fileInputRef} onChange={handleFileChange} type='file' required multiple />
              </div>
            </div>
           
          </div>
          
 <div className={styles.myProgress}>
            <div className={styles.myBar} style={{width:`${progressBar}%`, display: `${progressBar > 0 ? 'block' : 'none'}`}}>{progressBar}%</div>
          </div>
          <div className={styles.add_product_btn}>

             <button type='submit'>Add Product</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
