import React, { useState, useEffect } from 'react'
import { addFavorite, deleteFavorite, checkIfFavorited, addCart, deleteCart, checkIfCarted } from '../../../Config/config';
import { auth } from '../../../Config/config';

export default function Product({ brand, title, price, productType, rating, skinType, imageUrl, userName }) {
    const [favorites, setFavorites] = useState({});
    const [carts, setCarts] = useState({});
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    
    async function handleFavorite(title) {
      if (!userName) {
          alert("Please log in to use the favorites feature.");
          return;
      }
  
      try {
          const isCurrentlyFavorited = favorites[title];
          setFavorites((prev) => ({
              ...prev,
              [title]: !isCurrentlyFavorited,
          }));
  
          const userId = auth.currentUser?.uid;
          if (!userId) {
              alert("User is not authenticated.");
              return;
          }
  
          if (!isCurrentlyFavorited) {
              await addFavorite(userId, title);
          } else {
              await deleteFavorite(userId, title);
          }
      } catch (error) {
          console.error("Error handling favorites:", error);
      }
    }

    async function handleCart(title) {
      if (!userName) {
          alert("Please log in to use the carts feature.");
          return;
      }
  
      try {
          const isCurrentlyCarted = carts[title];
          setCarts((prev) => ({
              ...prev,
              [title]: !isCurrentlyCarted,
          }));
  
          const userId = auth.currentUser?.uid;
          if (!userId) {
              alert("User is not authenticated.");
              return;
          }
  
          if (!isCurrentlyCarted) {
              await addCart(userId, title);
          }
      } catch (error) {
          console.error("Error handling favorites:", error);
      }
    }

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

    function goToProductDetail() {
      const encodedTitle = encodeURIComponent(title);
      window.location.href = `/product-detail/${encodedTitle}`;
    }

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
        checkIfFavorited(userId, title).then((isFavorited) => {
            setFavorites((prev) => ({
                ...prev,
                [title]: isFavorited,
            }));
        });
    }

    function handleResize() {
      setIsMobile(window.innerWidth < 992);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='card product'>
        <button className="favorite-btn" type='button' onClick={() => handleFavorite(title)}>
            {favorites[title] ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
        </button>
        <img src={imageUrl} className="card-img-top" alt="..." onClick={goToProductDetail}/>
        <div className="card-body">
            <p><b>{brand}</b></p>
            <h5 className="card-title">{title}</h5>
            {isMobile ? null : <p className="card-text">{renderStars(rating)}</p>}
            <p className='price'><b>${price}</b></p>
            <p style={{display: "none"}}>{productType}</p>
            <p style={{display: "none"}}>{skinType}</p>
            <button className="cart-btn" type="button" onClick={() => {handleCart(title); }}>
              <i className="fa-solid fa-cart-shopping cart-icon"></i>
              Add to Cart
            </button>
        </div>
    </div>
  )
}
