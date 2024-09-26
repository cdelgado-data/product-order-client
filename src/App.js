// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from './components/Products';
import Orders from './components/Orders';
import Inventory from './components/Inventory';
import keycloak from './keycloak'; // Import keycloak instance

function App() {
  // Function to handle logout
  const handleLogout = () => {
    keycloak.logout(); // Trigger logout, which will redirect the user to the Keycloak logout page
  };

  return (
    <Router>
      <div>
        {/* Header section with title and logout button */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <h1>Product and Order Management</h1>
          {/* Logout button positioned to the right */}
          <button onClick={handleLogout} style={{ padding: '10px', cursor: 'pointer' }}>
            Logout
          </button>
        </header>
        
        {/* Navigation Menu */}
        <nav style={{ marginTop: '20px' }}>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/inventory">Inventory</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
