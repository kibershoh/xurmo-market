import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase/config'
import { useParams } from 'react-router-dom'
import { ref } from 'firebase/storage'

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
      setLoading(false); 

    });

    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading };
};



export default useGetData;