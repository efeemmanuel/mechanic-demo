import React, { useState, useEffect, useRef } from "react";
import { authAPI } from "../services/api";
import "../styles/Verify.css";

const Verify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(80);
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    const pendingEmail = localStorage.getItem('pendingVerification');
    
    if (!pendingEmail) {
      window.location.href = '/register';
      return;
    }
    
    setEmail(pendingEmail);

    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const verificationCode = otp.join('');
    
    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.verifyEmail(email, verificationCode);
      
      if (response.success) {
        await handleAutoLogin();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
      setLoading(false);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const pendingUserData = localStorage.getItem('pendingUserData');
      
      if (pendingUserData) {
        const userData = JSON.parse(pendingUserData);
        
        const loginResponse = await authAPI.login(userData.email, userData.password);
        
        if (loginResponse.success) {
          localStorage.setItem('accessToken', loginResponse.data.token);
          localStorage.setItem('refreshToken', loginResponse.data.refreshToken);
          localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
          
          localStorage.setItem('justRegistered', 'true');
          
          // Clear pending data
          localStorage.removeItem('pendingVerification');
          localStorage.removeItem('pendingUserData');
          
          // Redirect to mechanic dashboard
          window.location.href = '/dashboard';
        }
      } else {
        localStorage.removeItem('pendingVerification');
        window.location.href = '/login?verified=true';
      }
    } catch (loginError) {
      console.error('Auto-login failed:', loginError);
      localStorage.removeItem('pendingVerification');
      localStorage.removeItem('pendingUserData');
      window.location.href = '/login?verified=true';
    }
  };

  const handleResendCode = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.resendVerification(email);
      
      if (response.success) {
        setTimer(80);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
        alert('New verification code sent to your email!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <div className="verify-header">
          <img src="/icon.svg" alt="Logo" className="verify-logo" />
          <div className="verify-title-group">
            <h2>Verify Your Mechanic Account</h2>
            <p>
              We've sent a unique 6-digit verification code to your email.
              Please enter it below to activate your mechanic account.
            </p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="verify-form" onSubmit={handleSubmit}>
          <label htmlFor="otp" className="verify-label">
            Enter verification code
          </label>

          <div className="otp-inputs">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={el => inputRefs.current[i] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="otp-input"
                value={otp[i]}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                maxLength="1"
                required
                disabled={loading}
              />
            ))}
          </div>

          <div className="verify-timer">
            <p>
              The code will expire in <span className="highlight">{formatTime(timer)}</span>
            </p>
            <p>
              Didn't get a code?{" "}
              <button 
                type="button" 
                className="resend-link"
                onClick={handleResendCode}
                disabled={timer > 0 || loading}
              >
                Resend
              </button>
            </p>
          </div>

          <button 
            type="submit" 
            className="verify-btn"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
