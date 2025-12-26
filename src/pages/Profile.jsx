import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Profile.css";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.put("/auth/me/name", { name });
      setUser(res.data.user ?? res.data);
      alert("✅ Nombre actualizado");
      navigate("/products");
    } catch {
      alert("❌ Error al actualizar nombre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        {/* BOTÓN VOLVER */}
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>

        {/* AVATAR */}
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        {/* ROL */}
        <div className="profile-role">
          {user?.role === "admin" && "Administrador"}
        </div>

        <h2>Mi perfil</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label>Nombre</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>

        {/* ACCIONES */}
        <div className="profile-actions">
          {user?.role !== "admin" && (
            <button onClick={() => navigate("/change-password")}>
              Cambiar contraseña
            </button>
          )}

          <button
            className="danger"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
