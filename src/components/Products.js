// Products.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import keycloak from '../keycloak';


function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get('http://hpelite1:9001/api/product', {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        });
        setProducts(productResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (keycloak.authenticated) {
      fetchProducts();
    }
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.length ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.skuCode} - ${product.price} - Quantity: {product.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default Products;
