import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, getFirestore, setDoc, query, where, getDoc, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const storage = getStorage(app);

export async function saveProductData(brand, title, description, ingredients, productType, skinType, rating, imageUrl, price, size ) {
  const productData = { brand, title, description, ingredients, productType, skinType, rating, imageUrl, price, size };

  try {
    const productRef = doc(db, "Products", title);

    await setDoc(productRef, productData, { merge: true });

    const fileName = new URL(imageUrl).pathname.split("/").pop();

    const imagesCollectionRef = collection(productRef, "Images");
    const imageDocRef = doc(imagesCollectionRef, fileName);

    await setDoc(imageDocRef, { url: imageUrl });
    
    alert("Product and image added successfully!");
  } catch (err) {
    alert("Error adding product. Please try again.");
    console.error(err);
  }
};

export async function loadProductDataByType(productType) {
  try {
    const productsCollectionRef = collection(db, "Products");
    const productQuery = query(productsCollectionRef, where("productType", "==", productType));
    const querySnapshot = await getDocs(productQuery);

    if (!querySnapshot.empty) {
      const products = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
              const productData = doc.data();
              const imagesRef = collection(doc.ref, "Images");
              const imagesSnapshot = await getDocs(imagesRef);
              const images = imagesSnapshot.docs.map((imageDoc) => imageDoc.data().url);

              return {
                  id: doc.id,
                  ...productData,
                  images,
              };
          })
      );

      return products;
    } else {
        console.log("No products found for the specified productType.");
        return [];
    }
  } catch (err) {
      console.error("Error loading product data:", err);
      return null;
  }
}

export async function loadProductData(title) {
  try {
    const productRef = doc(db, "Products", title);
    const productDoc = await getDoc(productRef);

    if (productDoc.exists()) {
        const productData = productDoc.data();
        const imagesRef = collection(productRef, "Images");
        const imagesSnapshot = await getDocs(imagesRef);
        const images = imagesSnapshot.docs.map((imageDoc) => imageDoc.data().url);

        return {
            id: productDoc.id,
            ...productData,
            images,
        };
    } else {
        console.log("No product found with this title.");
        return null;
    }
  } catch (err) {
      console.error("Error loading product by title:", err);
      return null;
  }
}

export { app, auth, db, storage };