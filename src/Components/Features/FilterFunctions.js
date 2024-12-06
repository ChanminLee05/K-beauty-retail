
export const handlePriceFilter = (event, setPriceFilter) => {
  const value = event.target.value;
  setPriceFilter(value);
  // console.log("set", value)
};

export const handleSkinTypeFilter = (event, setSkinTypeFilter) => {
  const value = event.target.value;
  setSkinTypeFilter(value);
  // console.log("set", value)
};

export const handleRatingFilter = (event, setRatingFilter) => {
  const value = event.target.value;
  setRatingFilter(value);
  // console.log("set", value)
};
