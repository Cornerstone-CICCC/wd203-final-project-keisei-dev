import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="page">
      <h1>Welcome to Cafe App</h1>
      <p>Browse our menu and place your order.</p>
      <Link to="/items" className="button">
        View Menu
      </Link>
    </section>
  );
}

export default Home;
