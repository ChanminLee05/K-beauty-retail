import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { db, storage } from "../../Config/config";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function AddProduct() {
    const [pName, setPName] = useState('');
    const [pDesc, setPDesc] = useState('');
    const [pPrice, setPPrice] = useState('');
    const [image, setImage] = useState(null);

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
    function handleAddProduct(e) {
        e.preventDefault();
        // console.log(pName, pDesc, pPrice)
        // console.log(image)
        if (!image) {
            toast.error("Please select an image!", { position: "top-center" });
            return;
        }

        const storageRef = ref(storage, `product-images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', snapShot => {
            const progress = (snapShot.bytesTransferred/snapShot.totalBytes) * 100;
            console.log(progress)
        }, (error) => {
                toast.error(error.message, { position: "top-center" });
            }, () => {
                getDownloadURL(storageRef)
            .then(url => {
                db.collection('Products').add({
                    pName,
                    pDesc,
                    pPrice: Number(pPrice),
                    url
                }).then(() => {
                    toast.success("Product added successfully!", { position: "top-center", hideProgressBar: true });
                    setPName('');
                    setPDesc('');
                    setPPrice('');
                    document.getElementById('file').value = '';
                }).catch(error => toast.error(error.message, { position: "top-center" }));
            }).catch((error) => {
                toast.error(error.message, { position: "top-center" });
            });
        })
    }

    function handleProductImg(e) {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImage(selectedFile)
            } else {
                setImage(null);
                toast.error("Please select a valid image file type (png or jpg)", { position: "bottom-center" });
            }
        } else {
            setImage(null);
            toast.error("Please select your file", { position: "bottom-center" });
        }
    }
  return (
    <div className='sign-page'>
        <div className="sign-container">
            <h1>Add Products</h1>
            <form className='form-container' autoComplete='off' onSubmit={handleAddProduct}>
                <label htmlFor='pName'>Product Title</label>
                <input type='text' className='form-control' id='pName' required onChange={(e) => setPName(e.target.value)} value={pName}></input>
                <label htmlFor='pDesc'>Product Description</label>
                <input type='text' className='form-control' id='pDesc' required onChange={(e) => setPDesc(e.target.value)} value={pDesc}></input>
                <label htmlFor='pPrice'>Product Price</label>
                <input type='text' className='form-control' id='pPrice' required onChange={(e) => setPPrice(e.target.value)} value={pPrice}></input>
                <label htmlFor='file'>Upload Product Image</label>
                <input type='file' className='form-control' id='file' onChange={handleProductImg}/>
                <button className="btn btn-primary sign-btn" type='submit'>SUBMIT</button>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}
