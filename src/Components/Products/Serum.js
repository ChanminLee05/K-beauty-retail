import React, {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import SideBar from './SideBar/SideBar'
import ProductList from './Product/ProductList'
import { handlePriceFilter, handleSkinTypeFilter, handleRatingFilter } from '../Features/FilterFunctions';
import { auth } from '../../Config/config'

export default function Serum() {
  const [priceFilter, setPriceFilter] = useState('');
  const [skinTypeFilter, setSkinTypeFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || 'User');
      } else {
        setUserName(null);
      }
    });
  }, []);

  return (
    <>
      <Navbar userName={userName} bgColor="white" borderColor="lightgray"/>
      <div className='product-page row'>
        <SideBar 
          title="Serums"
          setPriceFilter={setPriceFilter}
          setSkinTypeFilter={setSkinTypeFilter}
          setRatingFilter={setRatingFilter}
          handlePriceFilter={handlePriceFilter}
          handleSkinTypeFilter={handleSkinTypeFilter}
          handleRatingFilter={handleRatingFilter}
        />
        <div className="right-section col-10">
          <ProductList 
            priceFilter={priceFilter}
            skinTypeFilter={skinTypeFilter}
            ratingFilter={ratingFilter}
            productType="serum"
            userName={userName}
          />
        </div>
      </div>
    </>
  )
}
