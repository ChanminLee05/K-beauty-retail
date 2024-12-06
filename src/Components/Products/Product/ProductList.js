import React, { useState, useEffect } from 'react'
import Product from './Product'
import { loadProductData } from '../../../Config/config';

export default function ProductList({ priceFilter, skinTypeFilter, ratingFilter, userName, productType }) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const data = await loadProductData(productType);
            if (data) {
                setItems(Object.values(data));
                console.log(data)
            } else {
                console.log("No products found.");
                setItems([]);
            }
            setIsLoading(false);
        }

        fetchData();
    }, [productType]);

    const filteredItems = items.filter(item => {
        const priceMatch = priceFilter ? (function() {
            const priceValue = parseFloat(priceFilter);
            const itemPrice = parseFloat(item.price.replace('$', ''));
    
            if (priceValue === 25) {
                return itemPrice < 25;
            } else if (priceValue === 50) {
                return itemPrice >= 25 && itemPrice < 50;
            } else if (priceValue === 100) {
                return itemPrice >= 50 && itemPrice < 100;
            } else if (priceValue === 200) {
                return itemPrice >= 100 && itemPrice < 200;
            } else {
                return itemPrice >= 200; 
            }
        })() : true;
        
        const skinTypeMatch = skinTypeFilter ? item.skinType.toLowerCase() === skinTypeFilter.toLowerCase() : true;

        let ratingMatch = true;
        if (ratingMatch) {
            const ratingValue = parseInt(ratingFilter);
            if (ratingValue === 4) {
                ratingMatch = item.rating > 4;
            } else if (ratingValue === 3) {
                ratingMatch = item.rating >= 3 && item.rating < 4;
            } else if (ratingValue === 2) {
                ratingMatch = item.rating >= 2 && item.rating < 3;
            } else if (ratingValue === 1) {
                ratingMatch = item.rating >= 1 && item.rating < 2;
            }
        }
        return priceMatch && skinTypeMatch && ratingMatch;
    });

    if (isLoading) {
        return <p>Loading products...</p>;
    }

  return (
    <>
        {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
                <Product 
                    key={item.title}
                    selectedImageUrl={item.images[0] || item.images[1]}
                    brand={item.brand}
                    title={item.title}
                    rating={item.rating}
                    price={item.price}
                    productType={item.productType}
                    skinType={item.skinType}
                    userName={userName}
                />
            ))
        ) : (
            <p>No products available.</p>
        )}
    </>
  )
}
