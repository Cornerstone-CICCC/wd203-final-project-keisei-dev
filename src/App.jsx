import { Route, Routes } from "react-router-dom";
import CartSidebar from "./components/CartSidebar.jsx";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Items from "./pages/Items.jsx";
import ItemDetail from "./pages/ItemDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="layout">
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <CartSidebar />
      </div>
    </div>
  );
}

export default App;
