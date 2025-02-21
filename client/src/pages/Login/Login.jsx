<<<<<<< HEAD
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
=======
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./Login.css"; // ✅ Import CSS

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
>>>>>>> a4c02f8 (fix)
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
<<<<<<< HEAD

    setFormState({
      ...formState,
      [name]: value,
    });
=======
    setFormState({ ...formState, [name]: value });
>>>>>>> a4c02f8 (fix)
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

<<<<<<< HEAD
    setFormState({
      email: '',
      password: '',
    });
  };

  const backgroundImage = '/images/background.png'; // Path to the image in the public folder

  return (
    <main
      style={{
        padding: '2rem',
        backgroundColor: '#F5F5F0', // Ivory background as fallback
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`, // Add the background image
        backgroundSize: 'cover', // Ensure the image covers the entire background
        backgroundPosition: 'center', // Center the background image
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: '#ffffff', // White card background
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #C4B454', // Soft Gold border
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#3D3D3D', // Dark Gray text
            marginBottom: '1.5rem',
            fontWeight: 'bold',
            fontSize: '1.8rem',
          }}
        >
          Login
        </h2>
        {data ? (
          <p
            style={{
              textAlign: 'center',
              color: '#3D3D3D', // Dark Gray text
              fontWeight: 'bold',
            }}
          >
            Success! You may now head{' '}
            <Link
              to="/"
              style={{
                color: '#3D3D3D', // Dark Gray link text
                textDecoration: 'underline',
              }}
            >
=======
    setFormState({ email: "", password: "" });
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {data ? (
          <p className="login-success">
            Success! You may now head{" "}
            <Link to="/" className="login-link">
>>>>>>> a4c02f8 (fix)
              back to the homepage.
            </Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
<<<<<<< HEAD
            <div style={{ marginBottom: '1.5rem' }}>
              <input
=======
            <div className="login-inputs">
              <input
                className="login-input"
>>>>>>> a4c02f8 (fix)
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
<<<<<<< HEAD
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #cccccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                }}
              />
              <input
=======
              />
              <input
                className="login-input"
>>>>>>> a4c02f8 (fix)
                placeholder="Your password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
<<<<<<< HEAD
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #cccccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#F5F5F0', // Ivory background for button
                color: '#3D3D3D', // Dark Gray text
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #C4B454', // Soft Gold border
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray background
                e.target.style.color = '#F5F5F0'; // Ivory text
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#F5F5F0';
                e.target.style.color = '#3D3D3D';
              }}
            >
=======
              />
            </div>
            <button type="submit" className="login-button">
>>>>>>> a4c02f8 (fix)
              Submit
            </button>
          </form>
        )}
<<<<<<< HEAD
        {error && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#FF4D4D', // Soft Red for error message
              color: '#ffffff',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {error.message}
          </div>
        )}
=======
        {error && <div className="login-error">{error.message}</div>}
>>>>>>> a4c02f8 (fix)
      </div>
    </main>
  );
};

export default Login;