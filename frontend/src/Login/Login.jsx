import React, { useState, useEffect } from 'react';
import './Login.css';

function Login() {
  // State for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Timer state (set to 60 seconds initially)
  const [timeLeft, setTimeLeft] = useState(60);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      alert('Time is up! Please try logging in again.');
      resetForm();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Simple form validation
  const isFormValid = username.trim().length > 0 && password.trim().length > 0;

  // Reset form and timer
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setTimeLeft(60);
  };

  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!isFormValid) {
      alert('Please fill in all required fields.');
      return;
    }

    // Replace with your own login logic or API call.
    console.log('Logging in with:', { username, password });

    // Reset form after "submission"
    resetForm();
    alert('Login submitted!');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      {/* Timer display */}
      <div className="timer-display">
        Time left: <span className="time-value">{timeLeft}</span> seconds
      </div>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={!isFormValid}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
