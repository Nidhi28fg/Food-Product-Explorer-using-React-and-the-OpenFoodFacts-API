import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductByBarcode } from '../services/openfoodfacts';

const ProductDetails = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await fetchProductByBarcode(barcode);
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [barcode]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.product_name}</h2>
      <img src={product.image_url} alt={product.product_name} />
      <p>Ingredients: {product.ingredients_text}</p>
      {/* Display other product details */}
    </div>
  );
};

export default ProductDetails;