import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page not-found">
      <p className="not-found__code">404</p>
      <h1>Page not found</h1>
      <p>That route does not exist in Cafe App.</p>
      <Link to="/" className="button">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
