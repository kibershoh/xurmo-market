import { collection, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ref } from 'firebase/storage'
import { db } from '../Firebase/config';

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
const useGetCommit = (collectionName,collectionName1) => {
    const {id} = useParams()
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsQuery = query(
          collection(db, collectionName1, id, collectionName),
          orderBy('timestamp')
        );
        const commentsSnapshot = await getDocs(commentsQuery);
        const commentData = [];

        commentsSnapshot.forEach((doc) => {
          commentData.push({ id: doc.id, ...doc.data() });
        });

        setData(commentData);
      } catch (error) {
        console.error('Error reading comments:', error);
      }
    };

    fetchComments();
  }, [id, db]);



  return { data };
};



export default useGetCommit;