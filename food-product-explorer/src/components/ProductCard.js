import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.code}`} className="product-card">
      <img src={product.image_url} alt={product.product_name} />
      <h3>{product.product_name}</h3>
      <p>Category: {product.categories}</p>
      <p>Nutrition Grade: {product.nutrition_grades}</p>
    </Link>
  );
};

export default ProductCard;