// src/context/ProductContext.js
import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext({
  selectedProduct: null,
  selectedVendorId: null,
  setSelectedProduct: () => {},
  setSelectedVendorId: () => {},
});

export const ProductProvider = ({ children }) => {
  // Initialize from localStorage
  const [selectedProduct, _setSelectedProduct] = useState(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    return storedProduct ? JSON.parse(storedProduct) : null;
  });
  const [selectedVendorId, setSelectedVendorId] = useState(() => {
    const storedVendorId = localStorage.getItem("selectedVendorId");
    // You can parse the value or leave it as a string depending on your needs.
    return storedVendorId || null;
  });

  // When a product is selected, save it and its vendor info to localStorage.
  const setSelectedProduct = (prod) => {
    _setSelectedProduct(prod);
    localStorage.setItem("selectedProduct", JSON.stringify(prod));
    if (prod?.vendorId) {
      setSelectedVendorId(prod.vendorId);
      localStorage.setItem("selectedVendorId", prod.vendorId);
    } else if (prod?.vendor) {
      setSelectedVendorId(prod.vendor);
      localStorage.setItem("selectedVendorId", prod.vendor);
    } else {
      setSelectedVendorId(null);
      localStorage.removeItem("selectedVendorId");
    }
  };

  // Alternatively, you can expose a custom function to set vendor id directly.
  const setSelectedVendorIdCustom = (vendorId) => {
    setSelectedVendorId(vendorId);
    if (vendorId) {
      localStorage.setItem("selectedVendorId", vendorId);
    } else {
      localStorage.removeItem("selectedVendorId");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        selectedVendorId,
        setSelectedProduct,
        setSelectedVendorId: setSelectedVendorIdCustom
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
