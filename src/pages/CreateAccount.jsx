import React, { useState, useEffect } from "react";
import { authAPI } from "../services/api";
import "../styles/CreateAccount.css";

const CreateAccount = () => {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1581094794321-8410e6f0d7ce?auto=format&fit=crop&w=1200&q=80",
      title: "Grow Your Mechanic Business",
      desc: "Connect with car owners and expand your customer base.",
    },
    {
      img: "https://images.unsplash.com/photo-1603712610496-5362a6d1379a?auto=format&fit=crop&w=1200&q=80",
      title: "Manage Your Workshop",
      desc: "Efficiently handle appointments, quotes, and customer communications.",
    },
    {
      img: "https://images.unsplash.com/photo-1565689228864-0f8b6b0b0b0b?auto=format&fit=crop&w=1200&q=80",
      title: "Get More Customers",
      desc: "Showcase your expertise to car owners looking for reliable mechanics.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    userType: '', // individual or business
    businessName: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      setLoading(false);
      return;
    }

    if (!formData.userType) {
      setError('Please select your business type');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        role: 'mechanic', // Hardcoded as mechanic
        userType: formData.userType,
        agreeToTerms: formData.agreeToTerms
      };

      const response = await authAPI.register(userData);
      
      if (response.success) {
        localStorage.setItem('pendingVerification', formData.email);
        localStorage.setItem('pendingUserData', JSON.stringify({
          email: formData.email,
          password: formData.password
        }));
        
        window.location.href = '/verify';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-carousel">
        <img
          src={slides[current].img}
          alt={slides[current].title}
          className="register-carousel-image fade-in"
        />
        <div className="register-carousel-overlay" />
        <div className="register-carousel-text">
          <h2>{slides[current].title}</h2>
          <p>{slides[current].desc}</p>
        </div>
        <div className="register-carousel-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`register-dot ${idx === current ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>

      <div className="register-form">
        <div className="register-form-header">
          <h2>Join as a Mechanic</h2>
          <p>Create your professional account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="register-google-btn">
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="google-logo"
          />
          <span>Sign up with Google</span>
        </button>

        <p className="register-divider">or</p>

        <form className="register-form-fields" onSubmit={handleSubmit}>
          <div className="register-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="register-input"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="register-input"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="register-row">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="register-input"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="register-input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Mechanic Business Type */}
          <div className="register-mechanic-type">
            <label>Business Type:</label>
            <div className="mechanic-type-options">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="individual"
                  checked={formData.userType === 'individual'}
                  onChange={handleInputChange}
                />
                Individual Mechanic
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="business"
                  checked={formData.userType === 'business'}
                  onChange={handleInputChange}
                />
                Business/Workshop
              </label>
            </div>
          </div>

          {/* Business Name for Business Type */}
          {formData.userType === 'business' && (
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              className="register-input"
              value={formData.businessName}
              onChange={handleInputChange}
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            className="register-input"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="register-input"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />

          <div className="register-terms">
            <label>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
              />
              I agree to the Terms and Conditions
            </label>
          </div>

          <p className="register-text">
            Already have an account?{" "}
            <a href="/login" className="register-link">
              Sign In
            </a>
          </p>

          <button 
            type="submit" 
            className="register-submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Join as Mechanic'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
