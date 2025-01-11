import axios from 'axios';

const BASE_URL = 'https://world.openfoodfacts.org/';

const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${category}.json`);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

const searchProductsByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/cgi/search.pl?search_terms=${name}&json=true`);
    return response.data.products;
  } catch (error) {
    console.error('Error searching products by name:', error);
    return [];
  }
};

const fetchProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v0/product/${barcode}.json`);
    return response.data.product;
  } catch (error) {
    console.error('Error fetching product by barcode:', error);
    return null;
  }
};

export { fetchProductsByCategory, searchProductsByName, fetchProductByBarcode };