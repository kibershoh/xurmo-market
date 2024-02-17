import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase/config'
import { useParams } from 'react-router-dom'
import { ref } from 'firebase/storage'

// const useGetData = collectionName =>{
//       const [data,setData] = useState([])
//       const [loading,setLoading] = useState(true)
//     const collectionRef = collection(db,collectionName)
// const getData = async () => {
//   try {
//     await onSnapshot(collectionRef, snapshot => {
//       setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
//       setLoading(false)
//     })
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     setLoading(false) // Set loading to false even in case of error
//   }
// }

//     // useEffect(()=>{
//     //   const getData = async()=>{
//     //        await onSnapshot(collectionRef, snapshot =>{
//     //        setData(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
//     //      setLoading(false)
//     //      })
//     //   }
       
//     //   getData()
//     // },[])
  
//     return{data,loading}
//   }
const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(newData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false even in case of error
    });

    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading };
};



export default useGetData;