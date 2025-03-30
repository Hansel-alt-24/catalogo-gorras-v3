import { useEffect } from "react";
import "./index.css";
import ProductGallery from "./components/ProductGallery";

function App() {
  useEffect(() => {
    document.title = "Catálogo de Gorras Keris Men’s";
  }, []);

  return (
    <div className="container">
      <h1>Gorras Keris Men’s</h1>
      <ProductGallery />
    </div>
  );
}

export default App; 