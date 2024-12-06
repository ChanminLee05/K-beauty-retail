import React, {useEffect, useState} from 'react'

export default function Product({ brand, title, price, productType, rating, skinType, selectedImageUrl, userName }) {
    const [favorites, setFavorites] = useState({});
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


  return (
    <div className='card product'>
        <button className="favorite-btn" onClick={() => handleFavorite(title)}>
            {favorites[title] ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
        </button>
        <img src={selectedImageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
            <p><b>{brand}</b></p>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{renderStars(rating)}</p>
            <p><b>{price}</b></p>
            <p style={{display: "none"}}>{productType}</p>
            <p style={{display: "none"}}>{skinType}</p>
        </div>
    </div>
  )
}
