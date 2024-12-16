import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { loadProductData } from '../../../Config/config';
import { auth } from '../../../Config/config'
import Navbar from '../../Navbar/Navbar'
import "./ProductDetail.css";
import NavbarMobile from '../../Navbar/NavbarMobile';



export default function ProductDetail() {
    const [userName, setUserName] = useState(null);
    const { title } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

    useEffect(() => {
      function handleResize() {
        const isCurrentlyMobile = window.innerWidth < 992;
        setIsMobile(isCurrentlyMobile);
      }
  
      window.addEventListener('resize', handleResize);

      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setUserName(user.displayName || 'User');
          } else {
            setUserName(null);
          }
        });
      }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            const productData = await loadProductData(title);
            setProduct(productData);
            setLoading(false);
        };

        fetchProductData();
    }, [title]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    const { brand, description, price, productType, size, rating, skinType, ingredients, images } = product;
    // console.log(product)

    function renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        return (
          <>
            {Array.from({ length: fullStars }).map((_, index) => (
              <i key={`full-${index}`} className="fa-solid fa-star"></i>
            ))}
            {hasHalfStar && (
                <i className="fa-solid fa-star-half-stroke"></i>
            )}
            {Array.from({ length: emptyStars }).map((_, index) => (
              <i key={`empty-${index}`} className="fa-regular fa-star"></i>
            ))}
          </>
        );
      }
    
  return (
    <div className='product-detail-page'>
      {isMobile ? <NavbarMobile /> : <Navbar userName={userName} />}
          <div className="product-detail-inner">
              <div className="product-detail-left">
                  <img className="product-detail-img" src={images[0] || images[1]} alt={`Product-${title}`} />
              </div>
              <div className="product-detail-right">
                  <p><strong>{brand}</strong></p>
                  <p>{title}</p>
                  <p><strong>${price}</strong></p>
                  <p><strong>Product Type:</strong> {productType}</p>
                  <p>Size: <button>{size}</button></p>
                  <p>{renderStars(rating)}</p>
                  <p><strong>Skin Type:</strong> {skinType}</p>
                  <button className='btn add-cart-btn'><i class="fa-solid fa-basket-shopping"></i>Add To Cart</button>
              </div>
          </div>
          <div className="product-detail-info">
              <h3>About Product</h3>
              <p><span>Description:</span> {description}</p>
              <h5>Ingredients</h5>
              <p className='ingredient-text'>{ingredients}</p>
          </div>
    </div>
  )
}
