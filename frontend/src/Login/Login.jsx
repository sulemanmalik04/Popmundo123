import React, { useState, useEffect } from 'react';
import './Login.css'; // Optional: if we use custom styles

function Login() {
  // State for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(60);

  // Handle the countdown timer using useEffect
  useEffect(() => {
    // If no time is left, reset the form and alert the user
    if (timeLeft <= 0) {
      alert('Time is up! Please try logging in again.');
      resetForm();
      return;
    }

    // Set up the countdown
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the interval on unmount or if timeLeft changes
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Basic form validation check
  const isFormValid = username.trim().length > 0 && password.trim().length > 0;

  // Reset form fields and timer
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setTimeLeft(60);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!isFormValid) {
      alert('Please fill in all required fields.');
      return;
    }

    // Example login logic:
    // Replace with your own API call or authentication logic
    console.log('Logging in with:', { username, password });

    // Example: call a backend endpoint
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password })
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     // Handle successful login (e.g., redirect to dashboard)
    //   } else {
    //     // Handle login error
    //   }
    // })
    // .catch(error => {
    //   console.error('Login error:', error);
    // });

    // For demo, just reset form after "submission"
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
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        {/* Disable the button if the form is invalid */}
        <button type="submit" disabled={!isFormValid}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

