import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

export const firebaseConfig = {
apiKey: "AIzaSyDVM84z6NZDccMpl4oZtgiBLqAw5-l_pHw",
  authDomain: "shopping-new-494a5.firebaseapp.com",
  projectId: "shopping-new-494a5",
  storageBucket: "shopping-new-494a5.appspot.com",
  messagingSenderId: "1008046141863",
  appId: "1:1008046141863:web:465e46ba83af71c4104682"
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const db = getFirestore(app)
 export const storage = getStorage(app)
 export default app;