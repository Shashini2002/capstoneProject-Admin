import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  loginPage: {
    textAlign: 'center',
    padding: '200px',
    fontFamily: 'Arial, sans-serif',
  },
  logoContainer: {
    marginBottom: '20px',
  },
  logo: {
    width: '200px',
    height: 'auto',
  },
  title: {
    color: '#318FE7',
    fontSize: '24px',
    margin: '10px 0',
  },
  subtitle: {
    color: '#000',
    fontSize: '18px',
    margin: '5px 0',
  },
  copyright: {
    color: '#000',
    fontSize: '12px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  loginButton: {
    backgroundColor: '#318FE7',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  loginButtonHover: {
    backgroundColor: '#276fbf',
  }
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverClient: false,
      hoverStaff: false
    };
  }

  toggleHoverClient = () => {
    this.setState({ hoverClient: !this.state.hoverClient });
  }

  toggleHoverStaff = () => {
    this.setState({ hoverStaff: !this.state.hoverStaff });
  }

  handleAdminLogin = () => {
    const { navigate } = this.props;
    navigate('/login');
  }

  render() {
    return (
      <div style={styles.loginPage}>
        <div style={styles.logoContainer}>
          <img src="LOGO.png" alt="Truck_mate Logo" style={styles.logo} />
          <h1 style={styles.title}>Delivery Management System</h1>
          <h2 style={styles.subtitle}>Truck Mate (Pvt) Ltd</h2>
          <p style={styles.copyright}>© 2024. All rights reserved.</p>
        </div>
        <div style={styles.buttonsContainer}>
          <button
            style={{
              ...styles.loginButton,
              ...(this.state.hoverClient ? styles.loginButtonHover : {}),
            }}
            onMouseEnter={this.toggleHoverClient}
            onMouseLeave={this.toggleHoverClient}
          >
            Driver Login
          </button>
          <button
            style={{
              ...styles.loginButton,
              ...(this.state.hoverStaff ? styles.loginButtonHover : {}),
            }}
            onMouseEnter={this.toggleHoverStaff}
            onMouseLeave={this.toggleHoverStaff}
            onClick={this.handleAdminLogin}
          >
            Admin Login
          </button>
        </div>
      </div>
    );
  }
}

const withNavigation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigation(LoginPage);
