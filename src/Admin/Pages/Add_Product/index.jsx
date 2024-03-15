// ~~~~~~React Hooks ~~~~~~~~~~//
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Modal} from '@mui/material'
import {motion} from 'framer-motion'
// ~~~~~~React Icons ~~~~~~~~~~//
import { MdAddAPhoto } from 'react-icons/md';
import { BsArrowLeft } from 'react-icons/bs';

// ~~~~~~FIREBASE (Backend) ~~~~~~~~~~//
import { db, storage } from '../../../Firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

// ~~~~~~Installed libraries ~~~~~~~~~~//
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// ~~~~~~Styles ~~~~~~~~~~//
import styles from './styles.module.scss';

// ~~~~~~ Components ~~~~~~~~~~//
import Select from '../../../UI_Design/SelectOption';
import UseAuth from '../../../Custom Hooks/UseAuth';
import { Loader } from '../../../Components';

// ~~~~~~ Datas ~~~~~~~~~~//
import { Time } from '../../../Constants/date';
import { CgClose } from 'react-icons/cg';
import { FaPlus } from 'react-icons/fa6';


const AddProduct = () => {

  // ~~~~~~~~~States~~~~~~~~~~~//
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [progressBar, setProgressBar] = useState(0);
  const [viewCount, setviewCount] = useState(0);
  const [files, setFiles] = useState([]);

  // ~~~~~~~~~Libraries~~~~~~~~~~~//
  const { currentUser } = UseAuth()
  const navigate = useNavigate();
  const id = uuidv4();
  // ~~~~~~~~~onChange Functions~~~~~~~~~~~//
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };


  // ~~~~~~~~~Functions~~~~~~~~~~~//
  const fileInputRef = useRef(null);
  const openFilePicker = () => {
    fileInputRef.current.click();
  };
  const addProduct = async (e) => {
    e.preventDefault();

    const numericValue = parseInt(price.split(' ').join('')) // Number tipiga o'tkazish

    if (files.length > 4) {
      toast.error("Rasm 4 tadan oshib ketgan")
    }
    else {
      try {
        const docRef = collection(db, 'products');

        const uploadTasks = files.map((file) => {
          const storageRef = ref(storage, `productImages/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file)
          uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgressBar(progress);
          });
          return uploadTask
        });
        // Yangi array hosil qilish//
        Promise.all(uploadTasks).then(async (snapshots) => {
          const downloadURLs = await Promise.all(snapshots.map((snapshot) => getDownloadURL(snapshot.ref)));

          const data = {
            ID: id,
            name: name,
            shortDesc: shortDesc,
            description: description,
            category: category,
            price: numericValue,
            date: new Date(),
            viewCount: viewCount,
            user: {
              userName: currentUser?.displayName,
              userImg: currentUser?.photoURL,
            },
            likeCount: [],
            reviews: [
              {
                rating: Math.floor(Math.random() * 5) + 1,
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
              },
              {
                rating: Math.floor(Math.random() * 5) + 1,
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
              },
            ],
            avgRating: Math.floor(Math.random() * 5) + 1,
            images: downloadURLs,
          };

          await addDoc(docRef, data);

          setName('');
          setCategory('');
          setPrice('');
          setShortDesc('');
          setDescription('');
          // setFiles([]);
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

  const handlePriceChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    let formattedValue = formatInput(inputValue);
    setPrice(formattedValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      let inputValue = value.substring(0, value.length - 1).replace(/\D/g, '');
      let formattedValue = formatInput(inputValue);
      setPrice(formattedValue);
    }
  };

  const formatInput = (inputValue) => {
    let formattedValue = '';
    if (inputValue.length >= 4 && inputValue.length <= 20) {
      formattedValue = inputValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    } else if (inputValue.length > 8) {
      formattedValue = inputValue.replace(/(\d{1,})(\d{1})/, '$1 $2');
    } else {
      formattedValue = inputValue;
    }
    return formattedValue;
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const styleBox = {
    position: 'absolute',
    top:'50%',
    left: {
      xs:'50%',
      sm:'60%',
    },
    right: 0,
    transform: {
      xs: 'translate(-50%, -50%)',
      sm: 'translate(-50%, -50%)'
    },
    width: {
      xs: '90%',
      sm: '70%',
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100vh'
  }
  return (
    <>

      <div className={styles.add_product}>
        <form>
          <button className={styles.back} onClick={() => navigate('/dashboard/all-products')}>
            <BsArrowLeft size={28} />
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
            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="text" required />
          </div>

          <div className={styles.inputs}>
              <label>Price</label>
            <input type="text" onKeyDown={handleKeyDown} value={price} onChange={handlePriceChange} name="text" placeholder='UZS' required />
          </div>

          <div className={styles.select_photo}>
            <div className={styles.categories}>
              <motion.button whileHover={{scale:1.1}} onClick={()=>navigate('/dashboard/categories')}><FaPlus size={25}/></motion.button>
              <Select handleFilter={handleFilter} category={category} />


              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                sx={styleModal}
              >
                <Box sx={styleBox}>
                  <div div className={styles.close_modal}>
                    <h2>Product Details</h2>
                    <div><span> added by</span>  </div>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={handleClose}><CgClose className={styles.close_icon} size={20} /></motion.button>

                  </div>




                    <Box sx={{ display: 'flex' }}>
                      ghhghg
                    </Box>

                      
                </Box>

              </Modal>


            </div>
            <div className={styles.add_categories}>
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
            <div className={styles.myBar} style={{ width: `${progressBar}%`, display: `${progressBar > 0 ? 'block' : 'none'}` }}>{progressBar}%</div>
          </div>

          <div className={styles.add_product_btn}>

            <motion.button whileHover={{scale:1.05}} onClick={addProduct}>Add Product</motion.button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
