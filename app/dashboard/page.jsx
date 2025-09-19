"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { graphqlRequest, AUTH_QUERIES, getStoredToken, getStoredUser, clearAuthData, storeAuthData } from "@/lib/api"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = getStoredToken()
    const userData = getStoredUser()

    if (!token || !userData) {
      router.push("/login")
      return
    }

    setUser(userData)
    fetchUserData(token)
  }, [router])

  const fetchUserData = async (token) => {
    try {
      const data = await graphqlRequest(AUTH_QUERIES.ME, {}, token)

      if (data.me) {
        setUser(data.me)
        storeAuthData(token, data.me)
      }
    } catch (err) {
      if (err.message.includes("authenticate") || err.message.includes("token")) {
        handleLogout()
      } else {
        setError(err.message || "Failed to fetch user data")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    clearAuthData()
    router.push("/")
  }

  const getInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : "U"
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ fontSize: "32px", marginBottom: "16px" }}>⏳</div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderBottom: "1px solid #e2e8f0",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "32px", marginRight: "8px" }}>🛡️</span>
            <span style={{ fontWeight: "bold", fontSize: "20px", color: "#1a202c" }}>SecureAuth</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "14px", color: "#718096" }}>Welcome, {user.username}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                backgroundColor: "transparent",
                color: "#667eea",
                border: "1px solid #667eea",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => ((e.target.style.backgroundColor = "#667eea"), (e.target.style.color = "white"))}
              onMouseOut={(e) => ((e.target.style.backgroundColor = "transparent"), (e.target.style.color = "#667eea"))}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px 20px",
        }}
      >
        {error && (
          <div
            style={{
              backgroundColor: "#fed7d7",
              color: "#c53030",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "24px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Welcome Section */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "8px", color: "white" }}>Dashboard</h1>
          <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>Welcome to your secure dashboard, {user.username}!</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {/* User Profile Card */}
          <div
            style={{
              gridColumn: "span 2",
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#1a202c",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                👤 Profile Information
              </h2>
              <p style={{ color: "#718096", margin: 0 }}>Your account details and verification status</p>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#667eea",
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {getInitials(user.username)}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 4px 0", color: "#1a202c" }}>
                  {user.username}
                </h3>
                <p style={{ color: "#718096", margin: "0 0 12px 0" }}>{user.email}</p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "4px 12px",
                    backgroundColor: user.isVerified ? "#c6f6d5" : "#fed7d7",
                    color: user.isVerified ? "#22543d" : "#c53030",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {user.isVerified ? "✅ Verified" : "⚠️ Unverified"}
                </div>
              </div>
            </div>
          </div>

          {/* Account Status Card */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#1a202c",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              🛡️ Account Status
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#2d3748" }}>Email Verified</span>
                <span style={{ fontSize: "20px" }}>{user.isVerified ? "✅" : "🟡"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#2d3748" }}>Account Active</span>
                <span style={{ fontSize: "20px" }}>✅</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#2d3748" }}>Security Level</span>
                <div
                  style={{
                    padding: "4px 12px",
                    backgroundColor: "#c6f6d5",
                    color: "#22543d",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  High
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div
            style={{
              gridColumn: "span 3",
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1a202c", marginBottom: "4px" }}>
                Quick Actions
              </h2>
              <p style={{ color: "#718096", margin: 0 }}>Common tasks and account management options</p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "16px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#f7fafc")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      padding: "8px",
                      backgroundColor: "#edf2f7",
                      borderRadius: "8px",
                      fontSize: "20px",
                    }}
                  >
                    👤
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "500", margin: "0 0 4px 0", color: "#1a202c" }}>Update Profile</h4>
                    <p style={{ fontSize: "14px", color: "#718096", margin: 0 }}>Change your account details</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#f7fafc")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      padding: "8px",
                      backgroundColor: "#edf2f7",
                      borderRadius: "8px",
                      fontSize: "20px",
                    }}
                  >
                    🛡️
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "500", margin: "0 0 4px 0", color: "#1a202c" }}>Security Settings</h4>
                    <p style={{ fontSize: "14px", color: "#718096", margin: 0 }}>Manage your security preferences</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#f7fafc")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      padding: "8px",
                      backgroundColor: "#edf2f7",
                      borderRadius: "8px",
                      fontSize: "20px",
                    }}
                  >
                    📧
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "500", margin: "0 0 4px 0", color: "#1a202c" }}>Email Preferences</h4>
                    <p style={{ fontSize: "14px", color: "#718096", margin: 0 }}>Configure notification settings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
