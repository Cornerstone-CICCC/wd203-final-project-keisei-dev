import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Header() {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <NavLink to="/" className="header__brand">
        Cafe App
      </NavLink>
      <nav className="header__nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/items">Items</NavLink>
        <NavLink to="/cart">
          Cart{itemCount > 0 ? ` (${itemCount})` : ""}
        </NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>
    </header>
  );
}

export default Header;
