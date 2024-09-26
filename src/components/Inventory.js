// Inventory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import keycloak from '../keycloak';

function Inventory() {
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        if (keycloak.authenticated) {
          const inventoryResponse = await axios.get(
            'http://hpelite1:9001/api/inventory?skuCode=iphone_15&quantity=100',
            {
              headers: {
                Authorization: `Bearer ${keycloak.token}`,
              },
            }
          );
          setInventory(inventoryResponse.data);
        } else {
          console.error('User is not authenticated');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h2>Inventory</h2>
      {inventory ? (
        <div>
          SKU Code: {inventory.skuCode} <br />
          Quantity Available: {inventory.quantity}
        </div>
      ) : (
        <p>No inventory data available</p>
      )}
    </div>
  );
}

export default Inventory;
