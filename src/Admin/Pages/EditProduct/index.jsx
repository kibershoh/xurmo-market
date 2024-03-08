// ~~~~~~React Hooks ~~~~~~~~~~//
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ~~~~~~React Icons ~~~~~~~~~~//
import { MdAddAPhoto } from 'react-icons/md';
import { BsArrowLeft } from 'react-icons/bs';

// ~~~~~~FIREBASE (Backend) ~~~~~~~~~~//
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, updateMetadata, uploadBytesResumable } from 'firebase/storage';

// ~~~~~~Installed libraries ~~~~~~~~~~//
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// ~~~~~~Styles ~~~~~~~~~~//
import styles from '../Add_Product/styles.module.scss';

// ~~~~~~ Components ~~~~~~~~~~//
import Select from '../../../UI_Design/SelectOption';
import UseAuth from '../../../Custom Hooks/UseAuth';
import { Loader } from '../../../Components';

// ~~~~~~ Datas ~~~~~~~~~~//
import { Time } from '../../../Constants/date';
import useGetData from '../../../Custom Hooks/UseGetData';
import { db, storage } from '../../../Firebase/config';


const Edit = () => {
  const { data: products, loading } = useGetData("products")
  const { id } = useParams()
  const [product, setProduct] = useState({})
  useEffect(() => {
    if (!loading) {
      const foundProduct = products?.find((item) => item.id === id);
      setProduct(foundProduct);
    }
  }, [id, products]);
  // ~~~~~~~~~States~~~~~~~~~~~//
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [viewCount, setViewCount] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  const [files, setFiles] = useState([]);
  const [likeCount, setlikeCount] = useState([]);
  useEffect(() => {
    if (product) {
      setName(product?.name !== '' ? product?.name :  ""); // Agar product.name mavjud bo'lmasa, bo'sh qiymatni o'rnating
      setShortDesc(product?.shortDesc !== '' ? product?.shortDesc :  "");
      setDescription(product?.description !== '' ? product?.description :  "");
      setCategory(product?.category !== '' ? product?.category :  "");
      setPrice(product?.price !== '' ? product?.price :  "");
      setViewCount(product?.viewCount !== '' ? product?.viewCount :  0);
      setlikeCount(product?.likeCount?.length !== 0 ? product?.likeCount :  []);
    }
  }, [product]);
  // ~~~~~~~~~Libraries~~~~~~~~~~~//
  const { currentUser } = UseAuth()
  const navigate = useNavigate();
  const uid = uuidv4();
  // ~~~~~~~~~onChange Functions~~~~~~~~~~~//
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };


  // ~~~~~~~~~Functions~~~~~~~~~~~//
  const fileInputRef = useRef(null);
  const openFilePicker = () => {
    fileInputRef.current.click();
  };


  const handleFilter = (e) => {
    setCategory(e.target.value);
  };

const handlePriceChange = (event) => {
  let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
  let formattedValue = formatInput(inputValue);
  setPrice(formattedValue.split(' ').join(''));
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

     const EditProduct = async (e) => {
  e.preventDefault();
  console.log("Salommmm");

  const numericValue = parseInt(price)

  if (files.length > 4) {
    toast.error("Rasm 4 tadan oshib ketgan")
  } else {
    try {
      const docRef = doc(db, 'products', product?.id);

      const uploadTasks = files.map((file) => {
        const storageRef = ref(storage, `productImages/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed', (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgressBar(progress);
        });
        return uploadTask
      });

      Promise.all(uploadTasks).then(async (snapshots) => {
        const downloadURLs = await Promise.all(snapshots.map((snapshot) => getDownloadURL(snapshot.ref)));

        const metadataUpdates = {
          contentType: 'image/jpeg', // Change it according to your file type
          customMetadata: {
            productId: product?.id, // Example of custom metadata
          }
        };

        // Update metadata for each uploaded file
        await Promise.all(downloadURLs.map(async (url) => {
          const fileRef = ref(storage, url);
          await updateMetadata(fileRef, metadataUpdates);
        }));

        const data = {
          ID: product?.ID,
          name,
          shortDesc,
          description,
          category,
          price: numericValue,
          dateExample: product.dateExample,
          viewCount,
          user: {
            userName: currentUser?.displayName,
            userImg: currentUser?.photoURL,
          },
          likeCount: likeCount.length !== 0 ? likeCount : [],
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

        console.log(data);
        await updateDoc(docRef, data);

        setName('');
        setCategory('');
        setPrice('');
        setShortDesc('');
        setDescription('');

        toast.success('Product successfully Edited!');
        navigate('/dashboard/all-products');
      });
    } catch (error) {
      toast.error('Failed to add product');
    }
  }
};

 
  return (
    <>

      <div className={styles.add_product}>
        <form onSubmit={EditProduct}>
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
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="text" required />
          </div>

          <div className={styles.inputs}>
            <label>Price</label>
            <input type="text" onKeyDown={handleKeyDown} value={price} onChange={handlePriceChange} name="text" placeholder='UZS' required />
          </div>

          <div className={styles.select_photo}>
            <div className={styles.categories}>
              <Select handleFilter={handleFilter} category={category} />
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

            <button type='submit'>Edit Product</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
