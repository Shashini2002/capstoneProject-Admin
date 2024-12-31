import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Complaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const res = await axios.get('http://localhost:3001/complaints');
        setComplaints(res.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    }
    fetchComplaints();
  }, []);

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

  return (
    <div>
       <Navbar />
      <h1 style={h1Style}>Complaints</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Order Id</th>
            <th style={thStyle}>User Name</th>
            <th style={thStyle}>Message</th>
            <th style={thStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaints, index) => (
            <tr
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? evenRowStyle.backgroundColor : 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverRowStyle.backgroundColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? evenRowStyle.backgroundColor : 'transparent'}
            >
              <td style={thTdStyle}>{complaints.orderId}</td>
              <td style={thTdStyle}>{complaints.username}</td>
              <td style={thTdStyle}>{complaints.message}</td>
              <td style={thTdStyle}>{new Date(complaints.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Complaints;
