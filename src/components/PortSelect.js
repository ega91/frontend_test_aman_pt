import React, { useState, useEffect } from 'react';

function PortSelect({ countryId, onPortChange }) {
  const [ports, setPorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (countryId) {
      fetch(`http://202.157.176.100:3000/pelabuhans?filter={"where":{"id_negara":"${countryId}"}}`)
        .then(response => response.json())
        .then(data => {
          console.log('Ports data received:', data); // Log data to check structure
          setPorts(data);
        })
        .catch(error => {
          console.error('Error fetching ports:', error);
          setError('Error fetching ports');
        })
        .finally(() => setLoading(false));
    }
  }, [countryId]);

  const handleChange = (event) => {
    const selectedPort = ports.find(port => port.id_pelabuhan === event.target.value);
    onPortChange(selectedPort);
  };

  if (loading) return <p>Loading ports...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <label>Pelabuhan:</label>
      <select onChange={handleChange}>
        <option value="">Pilih Pelabuhan</option>
        {ports.map(port => (
          <option key={port.id_pelabuhan} value={port.id_pelabuhan}>
            {port.nama_pelabuhan}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PortSelect;
