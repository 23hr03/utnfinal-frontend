import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Login
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      // 2️⃣ Obtener usuario real
      const me = await api.get("/auth/me");
      const userData = me.data.user ?? me.data;

      // 3️⃣ Setear contexto
      setUser(userData);

      // 4️⃣ Redirigir
      navigate("/products");

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error de conexión con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card-dark">
        <h2>Bienvenido de nuevo</h2>
        <p className="subtitle">Por favor ingrese sus datos</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="register-text">
          ¿No tenés cuenta?
          <button
            type="button"
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Registrate
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
