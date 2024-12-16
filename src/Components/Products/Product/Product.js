import React, { useState, useEffect } from 'react'

export default function Product({ brand, title, price, productType, rating, skinType, imageUrl, userName }) {
    const [favorites, setFavorites] = useState({});
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    
    function handleFavorite(id) {
        if (!userName) {
            alert("Please log in to use the favorites feature.")
            return;
        }
        setFavorites(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
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
        <button className="favorite-btn" onClick={() => handleFavorite(title)}>
            {favorites[title] ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
        </button>
        <img src={imageUrl} className="card-img-top" alt="..." onClick={goToProductDetail}/>
        <div className="card-body" onClick={goToProductDetail}>
            <p><b>{brand}</b></p>
            <h5 className="card-title">{title}</h5>
            {isMobile ? null : <p className="card-text">{renderStars(rating)}</p>}
            <p className='price'><b>${price}</b></p>
            <p style={{display: "none"}}>{productType}</p>
            <p style={{display: "none"}}>{skinType}</p>
        </div>
    </div>
  )
}
