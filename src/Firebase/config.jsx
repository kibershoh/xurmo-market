import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

export const firebaseConfig = {
apiKey: "AIzaSyCy3xaMnRkTYS0cr0CrlnbPnHqcWgtbz_c",
  authDomain: "shopping-vite2.firebaseapp.com",
  projectId: "shopping-vite2",
  storageBucket: "shopping-vite2.appspot.com",
  messagingSenderId: "856531898226",
  appId: "1:856531898226:web:2ed5af54be9a0de7bad7eb"
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const db = getFirestore(app)
 export const storage = getStorage(app)
 export default app;