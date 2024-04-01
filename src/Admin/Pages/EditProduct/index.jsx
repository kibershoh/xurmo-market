// ~~~~~~React Hooks ~~~~~~~~~~//
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ~~~~~~React Icons ~~~~~~~~~~//
import { MdAddAPhoto } from 'react-icons/md';
import { BsArrowLeft } from 'react-icons/bs';

// ~~~~~~FIREBASE (Backend) ~~~~~~~~~~//
import {  doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, updateMetadata, uploadBytesResumable } from 'firebase/storage';

// ~~~~~~Installed libraries ~~~~~~~~~~//
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// ~~~~~~Styles ~~~~~~~~~~//
import styles from './styles.module.scss';

// ~~~~~~ Components ~~~~~~~~~~//
import UseAuth from '../../../Custom Hooks/UseAuth';

// ~~~~~~ Datas ~~~~~~~~~~//
import useGetData from '../../../Custom Hooks/UseGetData';
import { db, storage } from '../../../Firebase/config';


const Edit = () => {
  const { data: products, loading } = useGetData("products")
  const { data: categories } = useGetData("categories")
  const { id } = useParams()
  const uuid = uuidv4()
  // ~~~~~~~~~States~~~~~~~~~~~//
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [bodyPrice, setBodyPrice] = useState('');
  const [benefit, setBenefit] = useState('');
  const [productId, setProductId] = useState('')
  const [viewCount, setViewCount] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  const [files, setFiles] = useState([]);
  const [likeCount, setlikeCount] = useState([]);
  const [product, setProduct] = useState({})

  useEffect(() => {
    if (!loading) {
      const newObj = products?.find((item) => item.id === id)
      setProduct(newObj);
    }
  }, [id, products]);
  console.log(product);

  useEffect(() => {
    if (product) {
      setName(product.name !== '' && product.name);
      setShortDesc(product.shortDesc !== '' && product.shortDesc);
      setDescription(product.description !== '' && product.description);
      setCategory(product.category !== '' && product.category);
      setBodyPrice(product.bodyPrice !== '' && product.bodyPrice);
      setBenefit(product.benefit !== '' && product.benefit);
      setViewCount(product.viewCount !== '' && product.viewCount)
      setProductId(product.id !== '' && product.id)
      setlikeCount(product.likeCount?.length !== 0 && product.likeCount);
    }
  }, [product]);
  //   // ~~~~~~~~~Libraries~~~~~~~~~~~//
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
    setBodyPrice(formattedValue.split(' ').join(''));
  };
  const handleBenefitChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    let formattedValue = formatInput(inputValue);
    setBenefit(formattedValue.split(' ').join(''));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      let inputValue = value.substring(0, value.length - 1).replace(/\D/g, '');
      let formattedValue = formatInput(inputValue);
      setPrice(formattedValue);
    }
  };
  const handleKeyDownBenefit = (event) => {
    if (event.key === 'Backspace') {
      let inputValue = value.substring(0, value.length - 1).replace(/\D/g, '');
      let formattedValue = formatInput(inputValue);
      setBenefit(formattedValue);
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
  const categoryEdit = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
  const EditProduct = async (e) => {
    e.preventDefault();
    console.log("Salommmm");

   try{
     

    if (files.length > 4) {
      toast.error("Rasm 4 tadan oshib ketgan")
    }
    if(!product){
toast.error("Bila")
    } else {
      try {
        const docRef = doc(db, 'products', productId);

        const uploadTasks = files.map((file) => {
          const storageRef = ref(storage, `productImages/${uuid+file.name}`);
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
            price: parseInt(bodyPrice),
            benefit: parseInt(benefit),
            bodyPrice: parseInt(bodyPrice),
            date: product?.date,
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

          await updateDoc(docRef, data);         
          toast.success('1Product successfully Edited!');
          navigate('/dashboard/all-products');
        });
      } catch (error) {
        toast.error('Failed to add product');
      }
    }

  }
  
  catch(error){
    toast.error(error)
  }
  };


  return (
    <>

      <div className={styles.edit_product}>
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
            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="text" required />
          </div>

          <div className={styles.inputs}>
            <label>Price</label>
            <input type="text" onKeyDown={handleKeyDown} value={bodyPrice} onChange={handlePriceChange} name="text" placeholder='UZS' required />
          </div>
          <div className={styles.inputs}>
            <label>Benefit</label>
            <input type="text" onKeyDown={handleKeyDownBenefit} value={benefit} onChange={handleBenefitChange} name="text" placeholder='UZS' required />
          </div>

          <div className={styles.select_photo}>
            <div className={styles.categories}>
              <select
                name="languages"
                id="language-select"
                value={category}
                onChange={handleFilter}
                className={styles.category_select}>
                <option value=""> {category} </option>
                {
                  categories && categories?.map((category) => (
                    <option key={category.id} value={category.category}>
                      {categoryEdit(category.category)}
                    </option>
                  ))
                }
              </select>
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

          <div className={styles.edit_product_btn}>

            <button type='submit'>Edit Product</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
