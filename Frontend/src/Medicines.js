import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/medicines');
        setMedicines(response.data.data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = medicines.slice(indexOfFirstItem, indexOfLastItem);

  const handleDetailsClick = (medicine) => {
    navigate('/Details', { state: { medicine } }); 
  };

  const handleAddToCart = (medicine) => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(medicine);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('${medicine.name} added to cart');
  };

  return (
    <div className="medicines-container">
      {currentMedicines.length > 0 ? (
        currentMedicines.map((medicine) => (
          <div key={medicine._id} className="medicine-card">
            <img src={medicine.img} alt={medicine.name} className="medicine-image" />
            <h3>{medicine.name}</h3>
            <p className="price">
              MRP {medicine.price} <span className="discount">58% off</span>
            </p>
            <div className="buttons">
              <button className="cart-btn w-75" onClick={() => handleAddToCart(medicine)}>Add to Cart</button>
              </div>
              <div className="buttons">

              <button className="details-btn w-75" onClick={() => handleDetailsClick(medicine)}>Details</button>
            </div>
          </div>
        ))
      ) : (
        <p>No medicines available</p>
      )}

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(medicines.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Medicines;
