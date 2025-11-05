import React, { useState } from "react";
import { authAPI } from "../services/api";
import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData.email, formData.password);
      
      if (response.success) {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Always redirect to mechanic dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-illustration">
        <img
          src="https://images.unsplash.com/photo-1581094794321-8410e6f0d7ce?auto=format&fit=crop&w=1200&q=80"
          alt="Mechanic workshop"
          className="login-image"
        />
        <div className="login-overlay" />
        <div className="login-text">
          <h2>Welcome Back, Mechanic</h2>
          <p>Sign in to manage your workshop and customers</p>
        </div>
      </div>

      <div className="login-form-section">
        <div className="login-header">
          <h2>Mechanic Sign In</h2>
          <p>Enter your details to access your workshop</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="login-input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="login-input"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <div className="login-links">
            <a href="/forgot-password" className="login-link">
              Forgot Password?
            </a>
            <p>
              Don't have an account?{" "}
              <a href="/register" className="login-link">
                Join as Mechanic
              </a>
            </p>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Login to Workshop'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;