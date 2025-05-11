import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3-KM7Vu_lzFzUwOfgopxML4mbyB8HeIo",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "mark-it-b512d",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "408332135657",
  appId: "1:408332135657:web:6fc69e61ae420ef5db77fc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
