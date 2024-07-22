import React, { useState, useEffect } from 'react';

function CountrySelect({ onCountryChange }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://202.157.176.100:3000/negaras')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data); // Log data to check structure
        if (Array.isArray(data) && data.length > 0) {
          setCountries(data);
        } else {
          setError('Data format is incorrect');
        }
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setError('Error fetching countries');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (event) => {
    const selectedCountry = countries.find(country => country.id_negara === parseInt(event.target.value));
    onCountryChange(selectedCountry);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <label>Negara:</label>
      <select onChange={handleChange}>
        <option value="">Pilih Negara</option>
        {countries.map(country => (
          <option key={country.id_negara} value={country.id_negara}>
            {country.nama_negara}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelect;
