// Orders.js
import React, { useState } from 'react';
import axios from 'axios';
import keycloak from '../keycloak';

function Orders() {
  const [order, setOrder] = useState({ skuCode: '', quantity: 0 });
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      if (keycloak.authenticated) {
        const response = await axios.post(
          'http://hpelite1:9001/api/order',
          {
            skuCode: order.skuCode,
            price: 1000, // Example price, adjust as needed
            quantity: order.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setResponse(response.data);
      } else {
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={placeOrder}>
        <div>
          <label>SKU Code:</label>
          <input type="text" name="skuCode" value={order.skuCode} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="quantity" value={order.quantity} onChange={handleInputChange} required />
        </div>
        <button type="submit">Place Order</button>
      </form>
      {response && <div>Order Response: {JSON.stringify(response)}</div>}
    </div>
  );
}

export default Orders;
