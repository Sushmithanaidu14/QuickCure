import React, { useState } from 'react';

const Checkout = ({ userId, cartDetails }) => {
  const [paymentLink, setPaymentLink] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleCheckout = () => {
    fetch('http://localhost:3000/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, cartDetails }),
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setPaymentLink(data.paymentLink);
        setTotalAmount(data.totalAmount);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Proceed to Payment</h2>
      <button onClick={handleCheckout}>Checkout</button>
      {message && <p>{message}</p>}
      {paymentLink && (
        <div>
          <p>Total Amount: ₹{totalAmount}</p>
          <a href={paymentLink}>Go to Payment Gateway</a>
        </div>
      )}
    </div>
  );
};

export default Checkout;
