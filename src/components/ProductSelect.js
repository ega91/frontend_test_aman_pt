import React, { useState, useEffect } from 'react';

function ProductSelect({ portId, onProductChange }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (portId) {
      setLoading(true);
      fetch(`http://202.157.176.100:3000/barangs?filter={"where":{"id_pelabuhan":"${portId}"}}`)
        .then(response => response.json())
        .then(data => {
          console.log('Products data received:', data); // Log data to check structure
          setProducts(data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setError('Error fetching products');
        })
        .finally(() => setLoading(false));
    }
  }, [portId]);

  const handleChange = (event) => {
    const selectedProduct = products.find(product => product.id_barang === parseInt(event.target.value));
    onProductChange(selectedProduct);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <label>Barang:</label>
      <select onChange={handleChange} value="">
        <option value="">Pilih Barang</option>
        {products.map(product => (
          <option key={product.id_barang} value={product.id_barang}>
            {product.nama_barang}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductSelect;
