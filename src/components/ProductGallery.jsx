// src/components/ProductGallery.jsx
import React, { useState, useEffect } from "react";
import { products as initialProducts } from "../data/products";

const isEditMode = false; // Cambiar a true para editar desde la página

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
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = ["Todas", ...new Set(products.map((p) => p.category))];

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
      category: form.category.value,
      currency: "Q",
    };
    setProducts((prev) => [...prev, newProduct]);
    form.reset();
  };

  const closeImage = () => setSelectedImage(null);

  const filteredProducts = products.filter(
    (p) => selectedCategory === "Todas" || p.category === selectedCategory
  );

  return (
    <div className="container">
      <h1>Catálogo de Gorras</h1>

      {/* Botones de categoría */}
      <div className="categorias">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setVisibleCount(12); // reiniciar vista al cambiar categoría
            }}
            className={selectedCategory === cat ? "activo" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Catálogo */}
      <div className="catalogo">
        {filteredProducts.slice(0, visibleCount).map((p) => (
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

      {/* Botón Ver más */}
      {visibleCount < filteredProducts.length && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button onClick={() => setVisibleCount((prev) => prev + 12)}>
            Ver más
          </button>
        </div>
      )}

      {/* Formulario de agregar */}
      {isEditMode && (
        <>
          <h2>Agregar Nueva Gorra</h2>
          <form onSubmit={addProduct}>
            <input name="name" placeholder="Nombre" required />
            <input name="description" placeholder="Descripción" required />
            <input name="price" type="number" step="0.01" placeholder="Precio" required />
            <input name="images" placeholder="URL(s) de imagen (separadas por coma)" required />
            <input name="category" placeholder="Categoría" required />
            <select name="available">
              <option value="true">Disponible</option>
              <option value="false">Agotado</option>
            </select>
            <button type="submit">Agregar Gorra</button>
          </form>
        </>
      )}

      {/* Lightbox de imagen */}
      {selectedImage && (
        <div className="lightbox" onClick={closeImage}>
          <img src={selectedImage} alt="Vista ampliada" />
        </div>
      )}
    </div>
  );
} 