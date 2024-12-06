import React, { useState } from 'react'
import { handlePriceFilter, handleSkinTypeFilter, handleRatingFilter } from '../../Features/FilterFunctions'

export default function SideBar({ 
  title,
  setPriceFilter, 
  setSkinTypeFilter, 
  setRatingFilter, 
  handlePriceFilter, 
  handleSkinTypeFilter, 
  handleRatingFilter 
}) {

  return (
    <div className="side-bar col-2">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Products</a></li>
                <li className="breadcrumb-item active" aria-current="page">{title}</li>
            </ol>
        </nav>
        <h1>{title}</h1>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Price Range
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
              <ul className="accordion-list">
                <li><input type='radio' id='25' value='25' name='price-selection' onChange={(e) => handlePriceFilter(e, setPriceFilter)}/><label htmlFor='25'>Under $25</label></li>
                <li><input type='radio' id='50' value='50' name='price-selection' onChange={(e) => handlePriceFilter(e, setPriceFilter)}/><label htmlFor='50'>$25 to $50</label></li>
                <li><input type='radio' id='100' value='100' name='price-selection' onChange={(e) => handlePriceFilter(e, setPriceFilter)}/><label htmlFor='100'>$25 to $100</label></li>
                <li><input type='radio' id='200' value='200' name='price-selection' onChange={(e) => handlePriceFilter(e, setPriceFilter)}/><label htmlFor='200'>$100 and $200</label></li>
                <li><input type='radio' id='above' value='above' name='price-selection' onChange={(e) => handlePriceFilter(e, setPriceFilter)}/><label htmlFor='above'>$200 and above</label></li>
              </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Skin Type
              </button>
            </h2>
            <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <ul className="accordion-list">
                    <li><input type='radio' id='normal' value='normal' name='skin-type' onChange={(e) => handleSkinTypeFilter(e, setSkinTypeFilter)}/><label htmlFor='normal'>Normal</label></li>
                    <li><input type='radio' id='dry' value='dry' name='skin-type' onChange={(e) => handleSkinTypeFilter(e, setSkinTypeFilter)}/><label htmlFor='dry'>Dry</label></li>
                    <li><input type='radio' id='oily' value='oily' name='skin-type' onChange={(e) => handleSkinTypeFilter(e, setSkinTypeFilter)}/><label htmlFor='oily'>Oily</label></li>
                    <li><input type='radio' id='combination' value='combination' name='skin-type' onChange={(e) => handleSkinTypeFilter(e, setSkinTypeFilter)}/><label htmlFor='combination'>Combination</label></li>
                    <li><input type='radio' id='sensitive' value='sensitive' name='skin-type' onChange={(e) => handleSkinTypeFilter(e, setSkinTypeFilter)}/><label htmlFor='sensitive'>Sensitive</label></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Rating
              </button>
            </h2>
            <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <ul className="accordion-list">
                    <li>
                        <input type='radio' id='4' value='4' name='rating' onChange={(e) => handleRatingFilter(e, setRatingFilter)}/>
                        <label htmlFor='4'>
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i>
                            & up
                        </label>
                    </li>
                    <li>
                        <input type='radio' id='3' value='3' name='rating' onChange={(e) => handleRatingFilter(e, setRatingFilter)}/>
                        <label htmlFor='3'>
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i>
                            & up
                        </label>
                    </li>
                    <li>
                        <input type='radio' id='2' value='2' name='rating' onChange={(e) => handleRatingFilter(e, setRatingFilter)}/>
                        <label htmlFor='2'>
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i>
                            & up
                        </label>
                    </li>
                    <li>
                        <input type='radio' id='1' value='1' name='rating' onChange={(e) => handleRatingFilter(e, setRatingFilter)}/>
                        <label htmlFor='1'>
                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i>
                            & up
                        </label>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
