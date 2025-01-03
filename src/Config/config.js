import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, getFirestore, setDoc, query, where, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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


// Save Product
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

// Load Product By Type
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

// Load Product
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

// Add Favorite
export async function addFavorite(userId, title) {
  try {
      const productDoc = await getDoc(doc(db, "Products", title));
      if (productDoc.exists()) {
          const favoriteRef = doc(db, `Users/${userId}/Favorites/${title}`);
          await setDoc(favoriteRef, {
              ...productDoc.data(),
              savedAt: new Date().toLocaleString()
          });
          alert("Favorite added successfully!")
          console.log("Favorite added successfully!");
      } else {
          console.error("Product not found.");
      }
  } catch (error) {
      console.error("Error adding to favorites:", error);
  }
}

// Delete Favorite
export async function deleteFavorite(userId, title) {
  try {
      const favoriteRef = doc(db, `Users/${userId}/Favorites/${title}`);
      await deleteDoc(favoriteRef);
      console.log("Favorite deleted successfully!");
  } catch (error) {
      console.error("Error deleting favorite:", error);
  }
}

// Check If Favorited
export const checkIfFavorited = async (userId, title) => {
  if (userId) {
      const favoriteRef = doc(db, `Users/${userId}/Favorites/${title}`);
      const favoriteDoc = await getDoc(favoriteRef);
      return favoriteDoc.exists();
  }
  return false;
};

// Add Cart
export async function addCart(userId, title) {
  try {
    // Reference to the product document
    const productDocRef = doc(db, "Products", title);
    const productDoc = await getDoc(productDocRef);

    if (productDoc.exists()) {
      const productData = productDoc.data();
      console.log("Product Data:", productData);

      const validProductData = removeUndefinedFields(productData);

      const imagesRef = collection(productDocRef, "Images");
      const imagesSnapshot = await getDocs(imagesRef);

      const images = imagesSnapshot.docs
        .map((imageDoc) => imageDoc.data().url)
        .filter((url) => url !== undefined);

      const cartRef = doc(db, `Users/${userId}/Cart/${title}`);

      await setDoc(cartRef, {
        ...validProductData,
        images,
        savedAt: new Date().toLocaleString
      });

      alert("Product added to Cart successfully!");
      console.log("Product added to Cart successfully!");
    } else {
      console.error("Product not found in Firestore.");
    }
  } catch (error) {
    console.error("Error adding product to Cart:", error);
  }
}

// Remove undefined fields from an object
function removeUndefinedFields(data) {
  return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
}

// Delete Cart
export async function deleteCart(userId, title) {
  try {
      const cartRef = doc(db, `Users/${userId}/Cart/${title}`);
      await deleteDoc(cartRef);
      console.log("Product deleted in Cart successfully!");
  } catch (error) {
      console.error("Error deleting favorite:", error);
  }
}

//Load Cart
export async function loadCartData(userId) {
  try {
    const cartCollectionRef = collection(db, `Users/${userId}/Cart`);
    const querySnapshot = await getDocs(cartCollectionRef);

    if (!querySnapshot.empty) {
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return products;
    } else {
      console.log("No products found in cart.");
      return [];
    }
  } catch (err) {
    console.error("Error loading cart data:", err);
    return [];
  }
}

// Check If Favorited
export const checkIfCarted = async (userId, title) => {
  if (userId) {
      const cartRef = doc(db, `Users/${userId}/Cart/${title}`);
      const cartDoc = await getDoc(cartRef);
      return cartDoc.exists();
  }
  return false;
};


export { app, auth, db, storage };