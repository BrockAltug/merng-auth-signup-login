"use client"

import { useState } from "react"
import Link from "next/link"
import { graphqlRequest, AUTH_QUERIES, storeAuthData } from "@/lib/api"

export default function SignupPage() {
  const [step, setStep] = useState("signup") // 'signup' or 'verify'
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [verificationCode, setVerificationCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError("")
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      await graphqlRequest(AUTH_QUERIES.SIGNUP, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })

      setStep("verify")
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const data = await graphqlRequest(AUTH_QUERIES.VERIFY_EMAIL, {
        email: formData.email,
        verificationCode: verificationCode,
      })

      if (data.verifyEmail) {
        storeAuthData(data.verifyEmail.token, data.verifyEmail.user)
        window.location.href = "/dashboard"
      }
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
              textDecoration: "none",
            }}
          >
            🛡️ SecureAuth
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            {step === "signup" ? (
              <>
                <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 8px 0", color: "#1a202c" }}>
                  Create Account
                </h1>
                <p style={{ color: "#718096", margin: 0 }}>Sign up for a new account to get started</p>
              </>
            ) : (
              <>
                <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 8px 0", color: "#1a202c" }}>
                  Verify Your Email
                </h1>
                <p style={{ color: "#718096", margin: 0 }}>We've sent a 6-digit code to {formData.email}</p>
              </>
            )}
          </div>

          {step === "signup" ? (
            <form onSubmit={handleSignup}>
              {error && (
                <div
                  style={{
                    backgroundColor: "#fed7d7",
                    color: "#c53030",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#2d3748" }}>
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    opacity: loading ? 0.6 : 1,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#2d3748" }}>
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    opacity: loading ? 0.6 : 1,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#2d3748" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    minLength={5}
                    style={{
                      width: "100%",
                      padding: "12px 45px 12px 12px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.2s",
                      opacity: loading ? 0.6 : 1,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#2d3748" }}>
                  Confirm Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    minLength={5}
                    style={{
                      width: "100%",
                      padding: "12px 45px 12px 12px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.2s",
                      opacity: loading ? 0.6 : 1,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: loading ? "#a0aec0" : "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#5a67d8")}
                onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#667eea")}
              >
                {loading ? "⏳ Creating Account..." : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerification}>
              {error && (
                <div
                  style={{
                    backgroundColor: "#fed7d7",
                    color: "#c53030",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ textAlign: "center", marginBottom: "25px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#edf2f7",
                    borderRadius: "50%",
                    marginBottom: "16px",
                    fontSize: "32px",
                  }}
                >
                  📧
                </div>
                <p style={{ fontSize: "14px", color: "#718096", margin: 0 }}>
                  Enter the 6-digit verification code sent to your email
                </p>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#2d3748" }}>
                  Verification Code
                </label>
                <input
                  name="verificationCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value)
                    if (error) setError("")
                  }}
                  required
                  disabled={loading}
                  maxLength={6}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "18px",
                    textAlign: "center",
                    letterSpacing: "0.2em",
                    outline: "none",
                    transition: "border-color 0.2s",
                    opacity: loading ? 0.6 : 1,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: loading ? "#a0aec0" : "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s",
                  marginBottom: "12px",
                }}
                onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#5a67d8")}
                onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#667eea")}
              >
                {loading ? "⏳ Verifying..." : "✅ Verify Email"}
              </button>

              <button
                type="button"
                onClick={() => setStep("signup")}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: "transparent",
                  color: "#667eea",
                  border: "2px solid #667eea",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  !loading && ((e.target.style.backgroundColor = "#667eea"), (e.target.style.color = "white"))
                }
                onMouseOut={(e) =>
                  !loading && ((e.target.style.backgroundColor = "transparent"), (e.target.style.color = "#667eea"))
                }
              >
                Back to Sign Up
              </button>
            </form>
          )}

          {step === "signup" && (
            <div style={{ marginTop: "25px", textAlign: "center", fontSize: "14px" }}>
              <span style={{ color: "#718096" }}>Already have an account? </span>
              <Link href="/login" style={{ color: "#667eea", textDecoration: "none", fontWeight: "500" }}>
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
