import { Route, Routes, useLocation } from "react-router-dom";
import CartSidebar from "./components/CartSidebar";
import Header from "./components/Header";
import ScrollMemory from "./components/ScrollMemory";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import styles from "./App.module.css";

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
    <div className={`${styles.app} ${isHome ? styles.home : styles.site}`}>
      <ScrollMemory />
      <Header variant={isHome ? "home" : "site"} />

      {isHome ? (
        <div className={styles.homeShell}>
          <main className={styles.homeShellMain}>
            <AppRoutes />
          </main>
          <CartSidebar />
        </div>
      ) : (
        <>
          <div className={styles.atmosphere} aria-hidden="true">
            <div className={styles.grain} />
            <div className={styles.veil} />
          </div>

          <div className={styles.stage}>
            <div className={styles.layout}>
              <main className={styles.main}>
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
