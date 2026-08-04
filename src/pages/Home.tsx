import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const HERO_IMAGE =
  "https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=2000";

function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.visual}>
        <img
          className={styles.media}
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
        />
        <div className={styles.shade} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <p className={styles.brand}>Cafe App</p>
        <h1 className={styles.headline}>Brewed to order.</h1>
        <p className={styles.text}>
          A small counter menu of coffee and tea{" "}
          <span className={styles.tail}>— pick a cup and check out.</span>
        </p>
        <div className={styles.actions}>
          <Link to="/items" className={styles.button}>
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
