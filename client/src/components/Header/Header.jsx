import { Link, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import "./Header.css"; // ✅ Ensure this file exists

const Header = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("/"); // ✅ Redirect after logout
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* ✅ Logo & Branding */}
        <div className="logo-container">
          <Link to="/" className="header-logo">
            <h1>AppName</h1>
          </Link>
          <p className="header-subtitle">Mission Statement</p>
        </div>

        {/* ✅ Navigation Links */}
        <nav className="nav-links">
          {Auth.loggedIn() ? (
            <>
              <Link to="/me" className="nav-button">Profile</Link>
              <button onClick={logout} className="nav-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button">Login</Link>
              <Link to="/signup" className="nav-button">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;