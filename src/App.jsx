import { useEffect } from "react";
import ProductGallery from "./components/ProductGallery";

function App() {
  useEffect(() => {
    document.title = "Catálogo de Gorras Barón Caps";
  }, []);

  return (
    <div className="container">
      <h1>Gorras Barón Caps</h1>
      <ProductGallery />
    </div>
  );
}

export default App;