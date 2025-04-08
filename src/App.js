// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import OrderDetailsPage from './OrderDetailsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/order/:orderId" element={<OrderDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
