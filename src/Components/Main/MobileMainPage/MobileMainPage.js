import React, {useState} from 'react'
import ProductList from "../../Products/Product/ProductList";
import "../../Products/ProductsMobile.css";

export default function MobileMainPage() {
    const [priceFilter, setPriceFilter] = useState('');
    const [skinTypeFilter, setSkinTypeFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [userName, setUserName] = useState(null);
  return (
    <div className='category-page'>
        <h4 className='head-line'>New Arrivals</h4>
        <div className="product-list-container">
            <ProductList 
                priceFilter={priceFilter}
                skinTypeFilter={skinTypeFilter}
                ratingFilter={ratingFilter}
                productType="lotion"
                userName={userName}
            />
        </div>
        <h4 className='head-line'>Trending Now</h4>
        <div className="product-list-container">
            <ProductList 
                priceFilter={priceFilter}
                skinTypeFilter={skinTypeFilter}
                ratingFilter={ratingFilter}
                productType="toner"
                userName={userName}
            />
        </div>
        <h4 className='head-line'>Chosen For You</h4>
        <div className="product-list-container">
            <ProductList 
                priceFilter={priceFilter}
                skinTypeFilter={skinTypeFilter}
                ratingFilter={ratingFilter}
                productType="serum"
                userName={userName}
            />
        </div>
    </div>
  )
}
