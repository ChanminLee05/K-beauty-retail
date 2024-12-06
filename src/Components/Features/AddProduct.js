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

    const { imageUrl, setImageUrl, fileInputRef, handleImageChange } = useHandleImage();
    
    async function handleSave(e) {
        e.preventDefault();

        if (!imageUrl) {
            toast.error("Please upload a product image.", { position: "top-center" });
            return;
        }

        try {
            await saveProductData(brand, title, desc, ingredients, productType, skinType, rating, imageUrl, price, size);
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
            setImageUrl(null);
        } catch (error) {
            toast.error("Error saving product. Please try again.", { position: "top-center", hideProgressBar: true });
        }
    }

  return (
    <div className='add-product-page'>
        <div className="add-product-side-bar">
            <div className="side-bar-top">
                <a className="navbar-brand" href="/">
                    <span>BrandNew</span>
                </a>
            </div>
            <div className="side-bar-bottom">
                <ul>
                    <li>
                        <button>
                            <i className="fa-solid fa-cube"></i>Overview
                        </button>
                    </li>
                    <li>
                        <button>
                            <i className="fa-solid fa-store"></i>Product
                        </button>
                    </li>
                    <li>
                        <button>
                            <i className="fa-solid fa-coins"></i>Sales
                        </button>
                    </li>
                    <li>
                        <button>
                            <i className="fa-solid fa-wallet"></i>Payments
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="add-product-container">
            <span><i className="fa-solid fa-store"></i> Add Products</span>
            <button className="add-btn" type='submit'><i className="fa-solid fa-check m-2"></i>Add Product</button>
            <form className='add-product-form-container' autoComplete='off' onSubmit={handleSave}>
                <div className="form-inside">
                    <div className="form-left">
                        <div className="form-left-sub">
                            <h3>General Information</h3>
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
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea
                                type="text"
                                id="ingredients"
                                className="form-control"
                                required
                                value={ingredients}
                                autoCorrect="on"
                                onChange={(e) => setIngredients(e.target.value)}
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
                        </div>
                        <div className="form-left-sub">
                            <h3>Skin Type and Rating</h3>
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
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="form-right-sub-top">
                            <label htmlFor="file">Upload Product Image</label>
                            <input
                                type="file"
                                id="file"
                                className="form-control"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, title)} 
                            />
                            {imageUrl && <img src={imageUrl} alt="Preview" className='preview-img' style={{width: "100%", height: "400px"}}/>}
                        </div>
                        <div className="form-right-sub">
                            <h3>Price and Stock</h3>
                            <label htmlFor="price">Product Price</label>
                            <input
                                type="text"
                                id="price"
                                className="form-control"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
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
                    </div>
                </div>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}
