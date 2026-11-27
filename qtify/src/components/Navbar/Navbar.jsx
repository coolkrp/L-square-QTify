import React, { useState } from "react";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import FeedbackModal from "../Feedback/FeedbackModal";
import styles from "./Navbar.module.css";

function Navbar({ searchData }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.search}>
          <Search
            placeholder="Search a song of your choice"
            searchData={searchData}
          />
        </div>
        <div className={styles.feedback}>
          <Button onClick={() => setFeedbackOpen(true)}>Give Feedback</Button>
        </div>
      </nav>
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}

export default Navbar;