import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        nicNumber: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, mobileNumber, nicNumber, password } = formData;

        // Basic validations
        if (!name || !email || !mobileNumber || !nicNumber || !password) {
            alert('All fields are required');
            return;
        }
        if (!/^[0-9]{10}$/.test(mobileNumber)) {
            alert('Mobile number must be 10 digits and start with 0');
            return;
        }
        if (!/^[0-9]{12}$/.test(nicNumber) && !/^[0-9]{9}v$/i.test(nicNumber)) {
            alert('NIC number must be 12 digits or 9 digits ending with "v"');
            return;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }

        // Send form data to the backend
        fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            console.log('Form submitted:', formData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <Navbar />
            <div className="signup-container">
                <form onSubmit={handleSubmit} className="signup-form">
                    <h1 style={h1Style}>Make An Admin</h1>
                    <br />
                    <div className="form-group">
                        <label>Enter Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Enter Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number:</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            pattern="0[0-9]{9}"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>NIC Number:</label>
                        <input
                            type="text"
                            name="nicNumber"
                            value={formData.nicNumber}
                            onChange={handleChange}
                            pattern="([0-9]{12}|[0-9]{9}v)"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Enter Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="8"
                        />
                    </div>
                    <button type="submit" className="signup-submit">SIGN UP</button>
                </form>
            </div>
            <style>{`
                .signup-container {
                    max-width: 600px;
                    margin: 30px auto;
                    
                    padding: 30px;
                    font-family: Arial, sans-serif;
                }

                .signup-form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .form-group {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .form-group label {
                    flex: 0 0 150px;
                    font-weight: bold;
                }

                .form-group input[type="text"],
                .form-group input[type="email"],
                .form-group input[type="password"] {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                .signup-submit {
                    width: 100%;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    background-color: #318FE7;
                    color: white;
                    font-size: 16px;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

const h1Style = {
    textAlign: 'center',
    marginTop: '100px',
    color: 'black',
    fontWeight: 'bold',
    backgroundImage: 'linear-gradient(120deg, #318FE7 0%, #318FE7 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
};

export default SignUp;
