import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import backgroundImage from './assets/bck.jpg'; // Adjust the path as needed

function Admin() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
   
    minHeight: '800px',
    color: '#fff',
  };

  const leftHalfStyle = {
    flex: 1,
    width: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  };

  const contentStyle = {
    zIndex: 2,
  };

  const headerStyle = {
    marginTop: '150px',
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '18px',
    marginBottom: '20px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const buttonStyle = {
    backgroundColor: '#318Fe7',
    color: 'white',
    padding: '10px 20px',
    margin: '10px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none', 
  };

  const buttonHoverStyle = {
    backgroundColor: '#8fd3f4',
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div style={containerStyle}>
        <div style={leftHalfStyle}>
          <div style={overlayStyle}></div>
          <div style={contentStyle}>
            <h1 style={headerStyle}>Welcome, Admin!</h1>
            <p style={descriptionStyle}>Manage your application efficiently and effectively.</p>
            <div style={buttonContainerStyle}>
              <Link to="/driver-list" style={buttonStyle}>Driver List</Link>
              <Link to="/complaints" style={buttonStyle}>Customer Complaints</Link>
              <Link to="/order_history1" style={buttonStyle}>Order State</Link>
              <Link to="/change-password" style={buttonStyle}>Change Password</Link>
              <Link to="/signup" style={buttonStyle}>Make An Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
