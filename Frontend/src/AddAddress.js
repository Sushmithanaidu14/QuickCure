import React, { useState } from 'react';

const AddAddress = ({ userId }) => {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAddress = () => {
    fetch('http://localhost:3000/add-address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, address }),
    })
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Add Address</h2>
      <input
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Enter your address"
      />
      <button onClick={handleAddAddress}>Save Address</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddAddress;
