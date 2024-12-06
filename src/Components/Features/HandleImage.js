import { useRef, useState } from 'react';
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../Config/config"

export function useHandleImage() {
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(null);

    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
    const maxFileSize = 1048487;

    async function handleImageChange(event, title) {
        console.log("Files selected:", event.target.files);
        const file = event.target.files[0];
        if (!file) return;
    
        if (!allowedTypes.includes(file.type)) {
            alert("Invalid file type. Please upload a JPG or PNG image.");
            return;
        }
    
        if (file.size > maxFileSize) {
            alert("File size exceeds 1 MB. Please upload a smaller file.");
            return;
        }
    
        try {
            const base64Data = await convertToBase64(file);
            await saveImageToFirestore(base64Data, title);
            setImageUrl(base64Data);
            alert("Image uploaded and saved successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Fill in the information first");
        }
    }

    async function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    async function saveImageToFirestore(base64Data, title) {
        const uniqueFileName = `${Date.now()}.jpg`;
        const productRef = doc(db, "Products", title);
        const imagesCollectionRef = collection(productRef, "Images");
        const imageDocRef = doc(imagesCollectionRef, uniqueFileName);

        await setDoc(imageDocRef, { base64: base64Data });
    }

    return { imageUrl, setImageUrl, fileInputRef, handleImageChange };
}