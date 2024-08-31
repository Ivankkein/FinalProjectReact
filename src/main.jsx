import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
 
const firebaseConfig = {
  apiKey: "AIzaSyB6SbiVC20gg2C6i160_UQoGycfU6dALww",  
  authDomain: "ivanfinalproject-8f226.firebaseapp.com",
  projectId: "ivanfinalproject-8f226",
  storageBucket: "ivanfinalproject-8f226.appspot.com",
  messagingSenderId: "777173433828",
  appId: "1:777173433828:web:9713aadddd1e50b1a75bf1"
};


initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
