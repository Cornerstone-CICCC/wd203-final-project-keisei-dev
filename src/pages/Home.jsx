import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop";

function Home() {
  return (
    <section className="home-hero">
      <div className="home-hero__visual">
        <img
          className="home-hero__media"
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
        />
        <div className="home-hero__shade" aria-hidden="true" />
      </div>

      <div className="home-hero__content">
        <p className="home-hero__brand">Cafe App</p>
        <h1 className="home-hero__headline">Brewed to order.</h1>
        <p className="home-hero__text">
          A small counter menu of coffee and tea — pick a cup and check out.
        </p>
        <div className="home-hero__actions">
          <Link to="/items" className="button button--light">
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
