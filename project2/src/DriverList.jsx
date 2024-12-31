import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function DriverList() {
  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/drivers/${id}`);
      fetchDrivers();
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div>
      <Navbar />
      <div >
        <h1 style={h1Style}>Driver List</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>ID Number</th>
              <th style={thStyle}>Vehicle Number</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>License Number</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(driver => (<tr  key={driver.id}
              style={{ backgroundColor: driver.id % 2 === 0 ? evenRowStyle.backgroundColor : 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverRowStyle.backgroundColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = driver.id % 2 === 0 ? evenRowStyle.backgroundColor : 'transparent'}>
              
                <td style={thTdStyle}>{driver.id}</td>
                <td style={thTdStyle}>{driver.name}</td>
                <td style={thTdStyle}>{driver.id_number}</td>
                <td style={thTdStyle}>{driver.vehicle_number}</td>
                <td style={thTdStyle}>{driver.email}</td>
                <td style={thTdStyle}>{driver.license_number}</td>
                <td style={thTdStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => handleDelete(driver.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  marginTop:'100px',
  color: 'black',
  padding: '20px',
  fontWeight: 'bold',
  backgroundImage: 'linear-gradient(120deg, #318FE7 0%, #318FE7 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
};
const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  textDecoration: 'none', // Ensure links look like buttons
};
export default DriverList;
