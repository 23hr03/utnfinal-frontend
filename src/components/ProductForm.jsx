import { useState } from "react";
import api from "../api/api";
import "../styles/components/ProductForm.css";

/* ======================
   CLOUDINARY CONFIG
====================== */
const CLOUD_NAME = "dittlcviy";
const UPLOAD_PRESET = "productos_unsigned";

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
};

const categories = ["Lácteos", "Fiambres", "Bebidas", "Otros"];

const ProductForm = ({ product, onClose, onSaved }) => {
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    stock: product?.stock || "",
    category: product?.category || "",
    image: product?.image || "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ======================
     INPUTS
  ====================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* VALIDACIONES */
    if (form.name.trim().length < 3) {
      alert("El nombre debe tener al menos 3 caracteres");
      return;
    }

    if (Number(form.price) <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }

    if (Number(form.stock) < 0) {
      alert("El stock no puede ser negativo");
      return;
    }

    if (!form.category) {
      alert("Seleccioná una categoría");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = form.image;

      if (file) {
        imageUrl = await uploadImage(file);
      }

      const payload = {
        ...form,
        image: imageUrl,
      };

      if (product) {
        await api.put(`/products/${product._id}`, payload);
        alert("✅ Producto actualizado correctamente");
      } else {
        await api.post("/products", payload);
        alert("✅ Producto creado correctamente");
      }

      onSaved();
      onClose();
    } catch (error) {
      if (error.response?.status === 403) {
        alert("❌ No tenés permisos para esta acción");
      } else {
        alert(
          error.response?.data?.message ||
          "❌ Error al guardar producto"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>{product ? "Editar producto" : "Nuevo producto"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {(file || form.image) && (
            <img
              src={file ? URL.createObjectURL(file) : form.image}
              alt="preview"
              className="preview-image"
            />
          )}

          <div className="modal-actions">
            <button className="save" type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>

            <button
              className="cancel"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
