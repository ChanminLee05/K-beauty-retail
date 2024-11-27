import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp0SXa29vZcxCsD1F09TnTbS_voGFwEtk",
  authDomain: "k-beauty-retail.firebaseapp.com",
  projectId: "k-beauty-retail",
  storageBucket: "k-beauty-retail.firebasestorage.app",
  messagingSenderId: "21957280571",
  appId: "1:21957280571:web:d6a29427f9ea72595bad1e",
  measurementId: "G-E1LT630DQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };