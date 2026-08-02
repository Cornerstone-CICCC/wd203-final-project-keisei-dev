import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Header() {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" end className="header__brand">
          Cafe App
        </NavLink>
        <nav className="header__nav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/items">Items</NavLink>
          <NavLink to="/cart" end className="header__cart-link">
            Cart
            <span className="header__count" aria-label={`${itemCount} items`}>
              {itemCount}
            </span>
          </NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
