import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchProductsByCategory, searchProductsByName } from './services/openfoodfacts';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SortOptions from './components/SortOptions';

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://world.openfoodfacts.org/categories.json');
        const data = await response.json();
        setCategories(data.tags);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory) {
        const fetchedProducts = await fetchProductsByCategory(selectedCategory);
        setProducts(fetchedProducts);
      } else {
        // Fetch all products (not recommended due to large data)
        // You can implement pagination or server-side filtering
        // setProducts([]); 
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleSearch = async (query) => {
    const fetchedProducts = await searchProductsByName(query);
    setProducts(fetchedProducts);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    const sortedProducts = [...products];

    if (sortOption === 'name-asc') {
      sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (sortOption === 'name-desc') {
      sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else if (sortOption === 'nutrition-asc') {
      sortedProducts.sort((a, b) => {
        const aGrade = a.nutrition_grades || 'E';
        const bGrade = b.nutrition_grades || 'E';
        return aGrade.localeCompare(bGrade); 
      });
    } else if (sortOption === 'nutrition-desc') {
      sortedProducts.sort((a, b) => {
        const aGrade = a.nutrition_grades || 'E';
        const bGrade = b.nutrition_grades || 'E';
        return bGrade.localeCompare(aGrade); 
      });
    }

    setProducts(sortedProducts);
  };

  return (
    <Router>
      <div className="app">
        <h1>Food Product Explorer</h1>
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter categories={categories} onCategorySelect={handleCategorySelect} />
        <SortOptions onSortChange={handleSortChange} />
        <Routes>
          <Route
            path="/"
            element={<ProductList products={products} />}
          />
          <Route 
            path="/product/:barcode" 
            element={<ProductDetails />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;