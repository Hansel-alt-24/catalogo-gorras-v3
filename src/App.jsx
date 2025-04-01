import { Helmet } from "react-helmet";
import ProductGallery from "./components/ProductGallery";

function App() {
  return (
    <div className="container">
      <Helmet>
        <title>Catálogo de Gorras Barón Caps</title>
      </Helmet>
      <h1>Gorras Keris Men’s</h1>
      <ProductGallery />
    </div>
  );
}

export default App;