import React from "react";
import styles from "./Hero.module.css";
import heroHeadphones from "../../assets/hero_headphones.png";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          <span className={styles.line}>100 Thousand Songs, free</span>
          <span className={styles.line}>Over thousands podcast episodes</span>
        </h1>
        <img
          className={styles.image}
          src={heroHeadphones}
          width={212}
          alt="headphones"
        />
      </div>
    </section>
  );
}

export default Hero;