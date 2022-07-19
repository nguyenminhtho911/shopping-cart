import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home";
import Products from "./component/Products";
import Cart from "./component/Cart";
import ProductDetail from "./component/ProductDetail";
import Contact from "./component/Contact";
import About from "./component/About";
import Login from "./component/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
