export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "64px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#2563eb",
                  borderRadius: "6px",
                  marginRight: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                🛡
              </div>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#111827",
                }}
              >
                SecureAuth
              </span>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <a
                href="/login"
                style={{
                  padding: "8px 16px",
                  color: "#374151",
                  textDecoration: "none",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                }}
              >
                Login
              </a>
              <a
                href="/signup"
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "24px",
              color: "#111827",
              lineHeight: "1.1",
            }}
          >
            Secure Authentication
            <span style={{ color: "#2563eb", display: "block" }}>Made Simple</span>
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto 32px",
              lineHeight: "1.6",
            }}
          >
            Experience seamless user authentication with email verification, secure login, and modern design.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/signup"
              style={{
                padding: "12px 32px",
                backgroundColor: "#2563eb",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Get Started
            </a>
            <a
              href="/login"
              style={{
                padding: "12px 32px",
                border: "2px solid #2563eb",
                color: "#2563eb",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "16px",
                backgroundColor: "transparent",
              }}
            >
              Sign In
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            marginBottom: "64px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#2563eb",
                borderRadius: "8px",
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
              }}
            >
              🛡
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Secure by Design
            </h3>
            <p
              style={{
                color: "#6b7280",
                lineHeight: "1.5",
              }}
            >
              Built with industry-standard security practices including JWT tokens and bcrypt password hashing.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#2563eb",
                borderRadius: "8px",
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
              }}
            >
              ⚡
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              Email Verification
            </h3>
            <p
              style={{
                color: "#6b7280",
                lineHeight: "1.5",
              }}
            >
              Automated email verification system ensures only verified users can access your application.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#2563eb",
                borderRadius: "8px",
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
              }}
            >
              👥
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              User Management
            </h3>
            <p
              style={{
                color: "#6b7280",
                lineHeight: "1.5",
              }}
            >
              Complete user management system with profile access and secure authentication flows.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
