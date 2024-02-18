import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

export const firebaseConfig = {

apiKey: "AIzaSyBIr-FA-_IQFBdJpAlJyr3Qtox2Id8MJRQ",
  apiKey: "AIzaSyAqdZQmkxpy9jyqqI8UClyy3Uk-irPUSd8",
  authDomain: "shopping-vite.firebaseapp.com",
  projectId: "shopping-vite",
  storageBucket: "shopping-vite.appspot.com",
  messagingSenderId: "420114536524",
  appId: "1:420114536524:web:fe769d6a9f528fd94c7ce9"
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const db = getFirestore(app)
 export const storage = getStorage(app)
 export default app;