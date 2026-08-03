import { Link } from "react-router-dom";

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-block">
          <p className="site-footer__brand">Cafe App</p>
          <p className="site-footer__text">
            A small counter menu — order ahead, pick up when ready.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/items">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </div>
    </footer>
  );
}

export default SiteFooter;
