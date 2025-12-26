import { useEffect, useState } from "react";
import api from "../api/api";
import ProductForm from "../components/ProductForm";
import "../styles/pages/Productos.css";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const load = async () => {
    const res = await api.get("/products");
    setProducts(res.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = products.filter((p) => {
    const matchName = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category
      ? p.category === category
      : true;

    return matchName && matchCategory;
  });

  return (
    <div className="products-container">
      <h2>Productos</h2>

      {/* TOP BAR */}
      <div className="products-topbar">
        <div className="filters">
          <input
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Lácteos">Lácteos</option>
            <option value="Fiambres">Fiambres</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        {/* 👇 SOLO ADMIN */}
        {isAdmin && (
          <button
            className="add-btn"
            onClick={() => {
              setSelectedProduct(null);
              setShowForm(true);
            }}
          >
            ➕ Nuevo producto
          </button>
        )}
      </div>

      {/* GRID */}
      <div className="product-list">
        {filtered.map((p) => (
          <div className="product-card" key={p._id}>
            {p.stock <= 5 && (
              <span className="stock-badge">Stock bajo</span>
            )}

            <img
              src={p.image}
              alt={p.name}
              className="product-image"
            />

            <p className="product-category">{p.category}</p>
            <h4>{p.name}</h4>
            <p className="product-price">${p.price}</p>
            <p className="stock">Stock: {p.stock}</p>

            {/* 👇 SOLO ADMIN */}
            {isAdmin && (
              <div className="actions">
                <button
                  onClick={() => {
                    setSelectedProduct(p);
                    setShowForm(true);
                  }}
                >
                  ✏️
                </button>

                <button
                  onClick={async () => {
                    if (confirm("¿Eliminar producto?")) {
                      await api.delete(`/products/${p._id}`);
                      load();
                    }
                  }}
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showForm && isAdmin && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setShowForm(false)}
          onSaved={load}
        />
      )}
    </div>
  );
};

export default Products;
