import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

export const firebaseConfig = {

 apiKey: "AIzaSyDTIhnGvV3nvIDFTk9Bor0t6j66a0kE7o8",
  authDomain: "shopping-4a8d6.firebaseapp.com",
  databaseURL: "https://shopping-4a8d6-default-rtdb.firebaseio.com",
  projectId: "shopping-4a8d6",
  storageBucket: "shopping-4a8d6.appspot.com",
  messagingSenderId: "493510002186",
  appId: "1:493510002186:web:d52bfd301625666d5b81f3"
// ~~~~~~~~ Team accauntniki~~~~~~~~~~~~//
// apiKey: "AIzaSyBIr-FA-_IQFBdJpAlJyr3Qtox2Id8MJRQ",
//   authDomain: "shopping-791be.firebaseapp.com",
//   projectId: "shopping-791be",
//   storageBucket: "shopping-791be.appspot.com",
//   messagingSenderId: "313102473698",
//   appId: "1:313102473698:web:4fff9c6d31f1c7680201bb"
};

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const db = getFirestore(app)
 export const storage = getStorage(app)
 export default app;