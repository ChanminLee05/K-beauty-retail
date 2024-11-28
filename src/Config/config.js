import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCp0SXa29vZcxCsD1F09TnTbS_voGFwEtk",
  authDomain: "k-beauty-retail.firebaseapp.com",
  projectId: "k-beauty-retail",
  storageBucket: "k-beauty-retail.firebasestorage.app",
  messagingSenderId: "21957280571",
  appId: "1:21957280571:web:d6a29427f9ea72595bad1e",
  measurementId: "G-E1LT630DQJ",
  connectionString: "InstrumentationKey=****",
enableCorsCorrelation: true,
enableRequestHeaderTracking: true,
enableResponseHeaderTracking: true
};

// Initialize Firebase
// const analytics = firebase.getAnalytics(app);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };