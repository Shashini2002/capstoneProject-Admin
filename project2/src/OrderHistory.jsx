import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/order_history');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      setErrorMessage('Please enter an Order ID');
      setShowPopup(true);
      setSearchResult(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/order_history/${searchId}`);
      setSearchResult(response.data);
      setErrorMessage('');
      setShowPopup(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Not Found');
      } else {
        setErrorMessage('Error fetching order details');
      }
      setSearchResult(null);
      setShowPopup(true);
    }
  };

  const formatDateTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <h1 style={h1Style}>Order History</h1>
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Enter Order ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={searchInputStyle}
          />
          <button onClick={handleSearch} style={searchButtonStyle}>Search</button>
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Customer Name</th>
              <th style={thStyle}>Customer Address</th>
              <th style={thStyle}>Customer Contact</th>
              <th style={thStyle}>Supplier Name</th>
              <th style={thStyle}>Supplier Address</th>
              <th style={thStyle}>Supplier Contact</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Size</th>
              <th style={thStyle}>Weight</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Pickup</th>
              <th style={thStyle}>Delivery</th>
              <th style={thStyle}>Driver Email</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Date Delivered</th>
              <th style={thStyle}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order.order_id}
                style={{
                  backgroundColor: order.order_id % 2 === 0 ? evenRowStyle.backgroundColor : 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverRowStyle.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = order.order_id % 2 === 0 ? evenRowStyle.backgroundColor : 'transparent'}
              >
                <td style={thTdStyle}>{order.order_id}</td>
                <td style={thTdStyle}>{order.cusname}</td>
                <td style={thTdStyle}>{order.cusaddress}</td>
                <td style={thTdStyle}>{order.cuscontact}</td>
                <td style={thTdStyle}>{order.supname}</td>
                <td style={thTdStyle}>{order.supaddress}</td>
                <td style={thTdStyle}>{order.supcontact}</td>
                <td style={thTdStyle}>{order.description}</td>
                <td style={thTdStyle}>{order.category}</td>
                <td style={thTdStyle}>{order.size}</td>
                <td style={thTdStyle}>{order.weight}</td>
                <td style={thTdStyle}>{order.type}</td>
                <td style={thTdStyle}>{formatDateTime(order.pickup)}</td>
                <td style={thTdStyle}>{formatDateTime(order.delivery)}</td>
                <td style={thTdStyle}>{order.driver_email}</td>
                <td style={thTdStyle}>{order.status}</td>
                <td style={thTdStyle}>{formatDateTime(order.date_delivered)}</td>
                <td style={thTdStyle}>{formatDateTime(order.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <div style={popupStyle}>
            <button onClick={() => setShowPopup(false)} style={closeButtonStyle}>&times;</button>
            <div style={popupContentStyle}>
              {searchResult ? (
                <div>
                  <h2>Order Details</h2>
                  <p><strong>Order ID:</strong> {searchResult.order_id}</p>
                  <p><strong>Customer Name:</strong> {searchResult.cusname}</p>
                  <p><strong>Customer Address:</strong> {searchResult.cusaddress}</p>
                  <p><strong>Customer Contact:</strong> {searchResult.cuscontact}</p>
                  <p><strong>Supplier Name:</strong> {searchResult.supname}</p>
                  <p><strong>Supplier Address:</strong> {searchResult.supaddress}</p>
                  <p><strong>Supplier Contact:</strong> {searchResult.supcontact}</p>
                  <p><strong>Description:</strong> {searchResult.description}</p>
                  <p><strong>Category:</strong> {searchResult.category}</p>
                  <p><strong>Size:</strong> {searchResult.size}</p>
                  <p><strong>Weight:</strong> {searchResult.weight}</p>
                  <p><strong>Type:</strong> {searchResult.type}</p>
                  <p><strong>Pickup:</strong> {formatDateTime(searchResult.pickup)}</p>
                  <p><strong>Delivery:</strong> {formatDateTime(searchResult.delivery)}</p>
                  <p><strong>Driver Email:</strong> {searchResult.driver_email}</p>
                  <p><strong>Status:</strong> {searchResult.status}</p>
                  <p><strong>Date Delivered:</strong> {formatDateTime(searchResult.date_delivered)}</p>
                  <p><strong>Created At:</strong> {formatDateTime(searchResult.created_at)}</p>
                </div>
              ) : (
                <p style={messageStyle}>{errorMessage}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const tableStyle = {
  width: '90%',
  borderCollapse: 'collapse',
  margin: '20px auto',
  fontSize: '16px',
  border: '1px solid #ddd',
};

const thTdStyle = {
  padding: '12px 15px',
  textAlign: 'center',
  border: '1px solid #ddd',
};

const thStyle = {
  ...thTdStyle,
  backgroundColor: '#8fd3f4',
};

const evenRowStyle = {
  backgroundColor: '#f9f9f9',
};

const hoverRowStyle = {
  backgroundColor: '#f1f1f1',
};

const h1Style = {
  textAlign: 'center',
  marginTop: '100px',
  color: 'black',
  padding: '20px',
  fontWeight: 'bold',
  backgroundImage: 'linear-gradient(120deg, #318FE7 0%, #318FE7 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
};

const searchContainerStyle = {
  textAlign: 'center',
  margin: '20px auto',
};

const searchInputStyle = {
  padding: '10px',
  fontSize: '16px',
  marginRight: '10px',
  width: '200px',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

const searchButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#318FE7',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  padding: '20px',
  borderRadius: '4px',
  width: '400px',
  maxWidth: '90%',
};

const popupContentStyle = {
  position: 'relative',
  marginTop: '30px',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '5px 10px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '20px',
};

const messageStyle = {
  textAlign: 'center',
  color: 'red',
  fontSize: '18px',
};

export default OrderHistory;
