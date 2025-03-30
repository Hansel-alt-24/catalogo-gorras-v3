// src/components/ProductGallery.jsx
import React, { useState, useEffect } from "react";
import { products as initialProducts } from "../data/products";

const isEditMode = false; // Cambia a false para que otros usuarios no puedan editar

export default function ProductGallery() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("products");
      return saved ? JSON.parse(saved) : initialProducts;
    } catch (e) {
      console.error("Error cargando productos desde localStorage:", e);
      return initialProducts;
    }
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("products", JSON.stringify(products));
    } catch (e) {
      console.error("No se pudo guardar en localStorage:", e);
    }
  }, [products]);

  const toggleAvailability = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p))
    );
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      id: Date.now(),
      name: form.name.value,
      description: form.description.value,
      price: parseFloat(form.price.value),
      available: form.available.value === "true",
      images: form.images.value.split(",").map((img) => img.trim()),
      currency: "Q",
    };
    setProducts((prev) => [...prev, newProduct]);
    form.reset();
  };

  const closeImage = () => setSelectedImage(null);

  return (
    <div className="container">
      <h1>Catálogo de Gorras</h1>
      <div className="catalogo">
        {products.map((p) => (
          <div key={p.id} className="card">
            <div className="imagenes">
              {p.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${p.name} ${index + 1}`}
                  className="imagen"
                  onClick={() => setSelectedImage(img)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <p>
              <strong>{p.currency || "Q"}{p.price.toFixed(2)}</strong>
            </p>
            <p className={p.available ? "disponible" : "agotado"}>
              {p.available ? "Disponible" : "Agotado"}
            </p>
            {isEditMode && (
              <>
                <button onClick={() => toggleAvailability(p.id)}>
                  {p.available ? "Marcar como Agotado" : "Marcar como Disponible"}
                </button>
                <button onClick={() => removeProduct(p.id)} className="eliminar">
                  Eliminar
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {isEditMode && (
        <>
          <h2>Agregar Nueva Gorra</h2>
          <form onSubmit={addProduct}>
            <input name="name" placeholder="Nombre" required />
            <input name="description" placeholder="Descripción" required />
            <input name="price" type="number" step="0.01" placeholder="Precio" required />
            <input name="images" placeholder="URL(s) de imagen (separadas por coma)" required />
            <select name="available">
              <option value="true">Disponible</option>
              <option value="false">Agotado</option>
            </select>
            <button type="submit">Agregar Gorra</button>
          </form>
        </>
      )}

      {/* Visor emergente de imagen */}
      {selectedImage && (
        <div className="lightbox" onClick={closeImage}>
          <img src={selectedImage} alt="Vista ampliada" />
        </div>
      )}
    </div>
  );
}
