import { Route, Routes, useLocation } from "react-router-dom";
import CartSidebar from "./components/CartSidebar.jsx";
import Header from "./components/Header.jsx";
import ScrollMemory from "./components/ScrollMemory.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import Home from "./pages/Home.jsx";
import Items from "./pages/Items.jsx";
import ItemDetail from "./pages/ItemDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/items/:id" element={<ItemDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={isHome ? "app app--home" : "app app--site"}>
      <ScrollMemory />
      <Header />

      {isHome ? (
        <div className="home-shell">
          <main className="home-shell__main">
            <AppRoutes />
          </main>
          <CartSidebar />
        </div>
      ) : (
        <>
          <div className="site-atmosphere" aria-hidden="true">
            <div className="site-atmosphere__grain" />
            <div className="site-atmosphere__veil" />
          </div>

          <div className="site-stage">
            <div className="layout">
              <main className="main">
                <AppRoutes />
              </main>
              <CartSidebar />
            </div>
          </div>

          <SiteFooter />
        </>
      )}
    </div>
  );
}

export default App;
