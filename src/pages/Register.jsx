import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Usuario creado correctamente");
      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Error al registrar usuario"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card-dark">
        <h2>Crear una cuenta</h2>
        <p className="subtitle">Complete sus datos</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              required
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Nombre</label>
          </div>

          <div className="input-box">
            <input
              type="email"
              required
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <input
              type="password"
              required
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
          
        </form>
        <p className="register-text">
          <button
            className="register-btn"
            onClick={() => navigate("/login")}
          >
            Iniciar sesion
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
