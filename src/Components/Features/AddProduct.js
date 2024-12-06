import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { saveProductData } from "../../Config/config";
import { useHandleImage } from './HandleImage';
import "./AddProduct.css";

export default function AddProduct() {
    const [brand, setBrand] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [productType, setProductType] = useState('');
    const [size, setSize] = useState('');
    const [rating, setRating] = useState('');
    const [skinType, setSkinType] = useState('');
    const [ingredients, setIngredients] = useState('');

    const { selectedImageUrl, setSelectedImageUrl, fileInputRef, handleImageChange } = useHandleImage();
    
    async function handleSave(e) {
        e.preventDefault();

        if (!selectedImageUrl) {
            toast.error("Please upload a product image.", { position: "top-center" });
            return;
        }

        try {
            await saveProductData(brand, title, desc, price, productType, size, rating, skinType, ingredients, selectedImageUrl);
            toast.success("Product saved successfully!", { position: "top-center", hideProgressBar: true });
            setBrand('')
            setTitle('')
            setDesc('')
            setPrice('')
            setProductType('')
            setSize('')
            setRating('')
            setSkinType('')
            setIngredients('')
            document.getElementById('file').value = '';
            setSelectedImageUrl(null);
        } catch (error) {
            toast.error("Error saving product. Please try again.", { position: "top-center", hideProgressBar: true });
        }
    }

  return (
    <div className='add-product-page'>
        <div className="add-product-container">
            <h1>Add Products</h1>
            <form className='add-product-form-container' autoComplete='off' onSubmit={handleSave}>
                <div className="form-inside">
                    <div className="form-left">
                        <label htmlFor='brand'>Product Brand</label>
                        <input
                                type="text"
                                id="brand"
                                className="form-control"
                                required
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        <label htmlFor="title">Product Title</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="desc">Product Description</label>
                        <input
                            type="text"
                            id="desc"
                            className="form-control"
                            required
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <label htmlFor="price">Product Price</label>
                        <input
                            type="text"
                            id="price"
                            className="form-control"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label htmlFor="productType">Product Type</label>
                        <select
                            id="productType"
                            className="form-control"
                            required
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                        >
                            <option value="">Select Product Type</option>
                            <option value="lotion">Lotion</option>
                            <option value="toner">Toner</option>
                            <option value="serum">Serum</option>
                        </select>
                        <label htmlFor="size">Product Size</label>
                        <input
                            type="text"
                            id="size"
                            className="form-control"
                            required
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                    <div className="form-right">
                        <label htmlFor="rating">Product Rating</label>
                        <input
                            type="number"
                            id="rating"
                            className="form-control"
                            required
                            min="0"
                            max="5"
                            step="0.1"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <label htmlFor="skinType">Skin Type</label>
                        <select
                            id="skinType"
                            className="form-control"
                            required
                            value={skinType}
                            onChange={(e) => setSkinType(e.target.value)}
                        >
                            <option value="">Select Skin Type</option>
                            <option value="normal">Normal</option>
                            <option value="dry">Dry</option>
                            <option value="oily">Oily</option>
                            <option value="combination">Combination</option>
                            <option value="sensitive">Sensitive</option>
                        </select>
                        <label htmlFor="price">Ingredients</label>
                        <textarea
                            type="text"
                            id="ingredients"
                            className="form-control"
                            required
                            value={ingredients}
                            autoCorrect= "on"
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                        <label htmlFor="file">Upload Product Image</label>
                        <input
                            type="file"
                            id="file"
                            className="form-control"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={(event) => handleImageChange(event, title)} 
                        />
                        {selectedImageUrl && <img src={selectedImageUrl} alt="Preview" className='preview-img' style={{width: "30px", height: "30px"}}/>}
                    </div>
                </div>
                <button className="btn btn-primary" type='submit'>SUBMIT</button>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}
