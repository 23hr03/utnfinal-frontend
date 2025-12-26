import { NavLink } from "react-router-dom";
import "../styles/components/Header.css";

const Header = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <h2 className="logo">Trabajo Final</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          📦 Productos
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          👤 Mi perfil
        </NavLink>

        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          🏠 Home
        </NavLink>
      </nav>
    </aside>
  );
};

export default Header;
