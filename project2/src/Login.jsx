import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginType, setLoginType] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const navigate = useNavigate();

    const handleLoginTypeChange = (type) => {
        setLoginType(type);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, rememberMe } = formData;

        if (!email || !password) {
            alert('All fields are required');
            return;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, loginType })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (rememberMe) {
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                } else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                }
                alert('Login successful!');
                console.log('Form submitted:', formData, 'Login type:', loginType);
                // Redirect to admin page after successful login
                navigate('/admin');
            } else {
                alert('Invalid email or password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleSignupClick = (e) => {
        if (!loginType) {
            e.preventDefault();
            alert('Please choose your user state');
        }
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
            setFormData({ email: savedEmail, password: savedPassword, rememberMe: true });
        }
    }, []);

    return (
       
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <p style={{  textAlign: 'center',marginTop: '30px',color: 'black',padding: '20px',fontWeight: 'bold',backgroundImage: 'linear-gradient(120deg, #318FE7 0%, #318FE7 100%)',backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', }}>LOG IN YOUR ACCOUNT</p>
               
                <div>
                    <label>Your Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Your Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="8"
                    />
                </div>
                <div className="remember-me">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                    />
                    <label>Remember me</label>
                </div>
                <button type="submit" className="login-submit">LOG IN</button>
            </form>
            
            <style>{`
                .login-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 50px 20px;
                     margin-top: 120px; 
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    font-family: Arial, sans-serif;
                }

                .login-form {
                    display: flex;
                   
                    flex-direction: column;
                    align-items: center;
                }

                .login-form p {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                }

                .login-form label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: bold;
                    color: #555;
                }

                .login-form input[type="email"],
                .login-form input[type="password"] {
                    width: 100%;
                    max-width: 400px;
                    padding: 10px;
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    color: #333;
                }

                .remember-me {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    width: 100%;
                    max-width: 400px;
                }

                .remember-me input {
                    margin-right: 10px;
                }

                .login-submit {
                    width: 100%;
                    max-width: 400px;
                    padding: 12px;
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

export default Login;
