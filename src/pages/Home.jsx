import "../styles/pages/Home.css"

const Home = () => {
  return (
    <div className="home-container">
      {/* HERO */}
      <section className="home-hero">
        <h1>🧀 Fiambrería Don Pepe</h1>
        <p>Gestión simple de stock, productos y ventas</p>
      </section>

      {/* MÉTRICAS */}
      <section className="home-stats">
        <div className="stat-card">
          <h3>📦 Productos</h3>
          <span>128</span>
        </div>

        <div className="stat-card">
          <h3>🗂️ Categorías</h3>
          <span>12</span>
        </div>

        <div className="stat-card">
          <h3>🔥 Más vendido</h3>
          <span>Jamón Cocido</span>
        </div>

        <div className="stat-card">
          <h3>💰 Ventas hoy</h3>
          <span>$ 45.800</span>
        </div>
      </section>

      {/* ACCESOS */}
      <section className="home-actions">
        <h2>Accesos rápidos</h2>

        <div className="actions-grid">
          <a href="/products" className="action-card">
            <h4>🥩 Productos</h4>
            <p>Alta, edición y stock</p>
          </a>

          <a href="/categories" className="action-card">
            <h4>🗂️ Categorías</h4>
            <p>Organizá tus productos</p>
          </a>

          <a href="/profile" className="action-card">
            <h4>👤 Perfil</h4>
            <p>Editar datos de usuario</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
