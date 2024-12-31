import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 

function ChangePassword() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3001/user/password', {
        email,
        currentPassword,
        newPassword
      });

      if (response.data.success) {
        setMessage('Password updated successfully!');
      } else {
        setMessage('Current password is incorrect.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('An error occurred while updating the password.');
    }
  };

  return (
    <div>
      <Navbar /> 
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 style={h1Style}>Change Password</h1>
        <form onSubmit={handlePasswordChange} >
          <div>
            <label style={labelStyle}>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Current Password: </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>New Password: </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
          >
            Update Password
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

const labelStyle = {
  fontWeight: 'bold',
  display: 'inline-block',
  width: '150px',
  textAlign: 'left',
};
const h1Style = {
  textAlign: 'center',
  marginTop:'200px',
  color: 'black',
  padding: '20px',
  fontWeight: 'bold',
  backgroundImage: 'linear-gradient(120deg, #318FE7 0%, #318FE7 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
};

const inputStyle = {
  padding: '5px',
  margin: '10px 0'
};

const buttonStyle = {
  backgroundColor: '#318FE7',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  cursor: 'pointer',
  marginTop: '20px'
};

export default ChangePassword;
