import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import CountrySelect from './components/CountrySelect';
import PortSelect from './components/PortSelect';
import ProductSelect from './components/ProductSelect';

function App() {
  const [country, setCountry] = useState(null);
  const [port, setPort] = useState(null);
  const [product, setProduct] = useState(null);
  const [discount, setDiscount] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setPort(null);
    setProduct(null);
  };

  const handlePortChange = (selectedPort) => {
    setPort(selectedPort);
    setProduct(null);
  };

  const handleProductChange = (selectedProduct) => {
    setProduct(selectedProduct);
    setDiscount(selectedProduct.diskon);
    setPrice(selectedProduct.harga);
    calculateTotal(selectedProduct.harga, selectedProduct.diskon);
  };

  const calculateTotal = (price, discount) => {
    if (price && discount) {
      const total = price * (1 - discount / 100);
      setTotal(total.toLocaleString('id-ID'));
    } else {
      setTotal('');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Frontend Test Application - Galihwara_Aman</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <CountrySelect onCountryChange={handleCountryChange} />
      {country && <PortSelect countryId={country.id_negara} onPortChange={handlePortChange} />}
      {port && <ProductSelect portId={port.id_pelabuhan} onProductChange={handleProductChange} />}
      {product && (
        <div>
          <div>
            <label>Description:</label>
            <textarea
              value={product.description}
              readOnly
              rows="5"
              cols="50"
            />
          </div>
          <div>
            <label>Discount:</label>
            <input
              id="discount"
              type="text"
              value={`${discount}%`}
              readOnly
            />
          </div>
          <div>
            <label>Harga:</label>
            <input
              type="text"
              value={`Rp. ${price}`}
              readOnly
            />
          </div>
          <div>
            <label>Total:</label>
            <input
              type="text"
              value={`Rp. ${total}`}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
