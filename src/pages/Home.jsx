import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop";

function Home() {
  return (
    <section className="home">
      <div
        className="home-hero"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="home-hero__content">
          <p className="home-hero__brand">Cafe App</p>
          <h1 className="home-hero__headline">Coffee, made to order.</h1>
          <p className="home-hero__text">
            Browse the menu, fill your cart, and check out in a few taps.
          </p>
          <Link to="/items" className="button button--light">
            View Menu
          </Link>
        </div>
      </div>

      <div className="home-next">
        <h2>Ready when you are</h2>
        <p>Open the menu, pick a drink, and confirm at checkout.</p>
        <Link to="/items" className="button">
          Start Ordering
        </Link>
      </div>
    </section>
  );
}

export default Home;
