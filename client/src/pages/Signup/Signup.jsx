<<<<<<< HEAD
<<<<<<< HEAD:client/src/pages/Signup/Signup.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
=======
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER, VERIFY_EMAIL } from "../utils/mutations";
import Auth from "../utils/auth";
>>>>>>> 58c0128 (feat(auth): Implement email verification for user signup):client/src/pages/Signup.jsx

const Signup = () => {
  const navigate = useNavigate();

=======
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER, VERIFY_EMAIL } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./Signup.css"; // ✅ Import CSS

const Signup = () => {
  const navigate = useNavigate();
>>>>>>> a4c02f8 (fix)
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [addUser] = useMutation(ADD_USER);
  const [verifyEmail] = useMutation(VERIFY_EMAIL);

  const handleChange = (event) => {
    const { name, value } = event.target;
<<<<<<< HEAD
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

=======
    setFormState({ ...formState, [name]: value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
>>>>>>> a4c02f8 (fix)
    if (!validateEmail(formState.email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    setErrorMessage("");
    setInfoMessage("");

    try {
      const { data } = await addUser({ variables: { ...formState } });

<<<<<<< HEAD
      if (data && data.addUser) {
        const message = data.addUser; // Now `addUser` returns a string, not an object
        if (message.includes("User already exists but is unverified")) {
          setShowVerificationModal(true);
          setInfoMessage(
            "Your account is not verified. A new verification code has been sent."
          );
        } else {
          setShowVerificationModal(true);
          setInfoMessage(
            "A verification code has been sent to your email. Please check your inbox."
          );
        }
=======
      if (data?.addUser) {
        const message = data.addUser;
        if (message.includes("User already exists but is unverified")) {
          setInfoMessage("Your account is not verified. A new verification code has been sent.");
        } else {
          setInfoMessage("A verification code has been sent to your email.");
        }
        setShowVerificationModal(true);
>>>>>>> a4c02f8 (fix)
      } else {
        setErrorMessage("Unexpected error. Please try again.");
      }
    } catch (e) {
      setErrorMessage(e.message || "Error signing up. Please try again.");
    }
  };

  const handleVerificationSubmit = async () => {
    setErrorMessage("");
    setInfoMessage("");

    try {
      const { data } = await verifyEmail({
<<<<<<< HEAD
        variables: {
          email: formState.email,
          verificationCode: verificationCode,
        },
=======
        variables: { email: formState.email, verificationCode },
>>>>>>> a4c02f8 (fix)
      });

      if (data.verifyEmail) {
        Auth.login(data.verifyEmail.token);
        navigate("/");
      }
    } catch (e) {
      setErrorMessage("Invalid verification code. Please try again.");
    }
  };

  return (
<<<<<<< HEAD
    <main
      style={{
        padding: "2rem",
        backgroundColor: "#F5F5F0",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          padding: "2rem",
          border: "1px solid #C4B454",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#3D3D3D",
            marginBottom: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </h2>

        {!showVerificationModal ? (
          <form onSubmit={handleFormSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <input
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  border: "1px solid #cccccc",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                }}
              />
              <input
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  border: "1px solid #cccccc",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                }}
              />
              <input
                placeholder="Your password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  border: "1px solid #cccccc",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#F5F5F0",
                color: "#3D3D3D",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "1px solid #C4B454",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        ) : (
          <div>
            <h3
              style={{
                textAlign: "center",
                color: "#3D3D3D",
                fontWeight: "bold",
              }}
            >
              Enter Verification Code
            </h3>
            <input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #cccccc",
                borderRadius: "8px",
                fontSize: "1rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            />
            <button
              onClick={handleVerificationSubmit}
              style={{
                width: "100%",
                backgroundColor: "#3D3D3D",
                color: "#F5F5F0",
                padding: "0.8rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Verify
            </button>
          </div>
        )}

        {infoMessage && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#4CAF50",
              color: "#ffffff",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            {infoMessage}
          </div>
        )}

        {errorMessage && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#FF4D4D",
              color: "#ffffff",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </div>
        )}

        {!showVerificationModal && (
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: "#3D3D3D",
              fontSize: "0.9rem",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#3D3D3D",
                textDecoration: "underline",
              }}
            >
              Log in
            </Link>
=======
    <main className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>

        {!showVerificationModal ? (
          <form onSubmit={handleFormSubmit}>
            <div className="signup-inputs">
              <input className="signup-input" placeholder="Username" name="username" type="text" value={formState.username} onChange={handleChange} required />
              <input className="signup-input" placeholder="Email" name="email" type="email" value={formState.email} onChange={handleChange} required />
              <input className="signup-input" placeholder="Password" name="password" type="password" value={formState.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        ) : (
          <div className="verification-container">
            <h3 className="verification-title">Enter Verification Code</h3>
            <input className="verification-input" type="text" placeholder="Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            <button className="verification-button" onClick={handleVerificationSubmit}>Verify</button>
          </div>
        )}

        {infoMessage && <div className="info-message">{infoMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {!showVerificationModal && (
          <p className="signup-footer">
            Already have an account? <Link to="/login" className="signup-link">Log in</Link>
>>>>>>> a4c02f8 (fix)
          </p>
        )}
      </div>
    </main>
  );
};

export default Signup;