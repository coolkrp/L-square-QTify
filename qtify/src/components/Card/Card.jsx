import React, { useContext } from "react";
import styles from "./Card.module.css";
import { Chip, Tooltip } from "@mui/material";
import { MusicContext } from "../../context/MusicContext";

function Card({ data, type }) {
  const { playSong } = useContext(MusicContext);

  const getCard = (type) => {
    switch (type) {
      case "album": {
        const { image, follows, title, songs = [] } = data;
        return (
          <Tooltip title={`${songs.length} songs`} placement="top" arrow>
            <div className={styles.wrapper}>
              <div className={styles.card}>
                <img src={image} alt="album" />
                <div className={styles.banner}>
                  <Chip
                    label={`${follows} Follows`}
                    size="small"
                    className={styles.chip}
                  />
                </div>
              </div>
              <div className={styles.titleWrapper}>
                <p style={{ margin: 0 }}>{title}</p>
              </div>
            </div>
          </Tooltip>
        );
      }
      case "song": {
        const { image, title } = data;
        const likes = data.likes ?? data.follows ?? 0;

        return (
          <div
            className={`${styles.wrapper} ${styles.songCard}`}
            onClick={() => playSong(data)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                playSong(data);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className={styles.card}>
              <img src={image} alt="song" />
              <div className={styles.banner}>
                <div className={styles.pill}>
                  <Chip
                    label={`${likes} Likes`}
                    size="small"
                    className={styles.pill}
                  />
                </div>
              </div>
            </div>
            <div className={styles.titleWrapper}>
              <p>{title}</p>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };
  return getCard(type);
}

export default Card;