import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config is public by design — security is enforced by Firestore rules
const firebaseConfig = {
  apiKey: 'AIzaSyAXjPk44nZOh_ntJ-ygdiXBBcCqipaONqg',
  authDomain: 'arun-portfolio-435de.firebaseapp.com',
  projectId: 'arun-portfolio-435de',
  storageBucket: 'arun-portfolio-435de.firebasestorage.app',
  messagingSenderId: '323386233687',
  appId: '1:323386233687:web:24b76de7ac430d8ef3e412',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
