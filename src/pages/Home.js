import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../components/card/card";

import "../css/Home.css";

const Home = () => {
  const { products } = useSelector((state) => state.products);

  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);
  const [minRating, setMinRating] = useState(0); // Added minimum rating state
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const categories = products.map((product) => product.category);
    const uniqueCategories = Array.from(new Set(categories));
    setUniqueCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, minRating]); 

  useEffect(() => {
    let filteredProducts = products;

    if (searchTitle) {
      filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Added filter by minimum rating
    filteredProducts = filteredProducts.filter(
      (product) => product.rating.rate >= minRating
    );

    setFilteredProducts(filteredProducts);
  }, [searchTitle, selectedCategory, products, minRating]); 

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  if (sortByPrice === "lowToHigh") {
    currentItems = [...currentItems].sort((a, b) => a.price - b.price);
  } else if (sortByPrice === "highToLow") {
    currentItems = [...currentItems].sort((a, b) => b.price - a.price);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTitle(event.target.value);
    setCurrentPage(1);
  };

  const handleAllCategory = () => {
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortLowToHigh = () => {
    setSortByPrice("lowToHigh");
  };

  const handleSortHighToLow = () => {
    setSortByPrice("highToLow");
  };

  const handleRatingChange = (event) => {
    setMinRating(parseFloat(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <div className="filter-panel">
        <input
          className="input"
          type="text"
          placeholder="Ürün Adı Ara"
          value={searchTitle}
          onChange={handleSearchChange}
        />

        <div className="filter-categories">
          <button
            className={`filter-button ${selectedCategory === null ? "active" : ""}`}
            onClick={handleAllCategory}
          >
            Tümü
          </button>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`filter-button ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="product-list">
      <div className="sort-filter">
        <div className="sort-buttons">
       
        <button
      onClick={handleSortLowToHigh}
      className={sortByPrice === "lowToHigh" ? "sort-buttons-active" : ""}
    >
      Artan Fiyat
    </button>
    <button
      onClick={handleSortHighToLow}
      className={sortByPrice === "highToLow" ? "sort-buttons-active" : ""}
    >
      Azalan Fiyat
    </button>
        </div>

        <div className="rating-filter">
          <label>Minimum Rating: {minRating}</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={handleRatingChange}
          />
        </div>
</div>
        <div>
          {currentItems.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>

        <div className="pagination">
          <label>Items Per Page:</label>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="10">10</option>
          </select>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
