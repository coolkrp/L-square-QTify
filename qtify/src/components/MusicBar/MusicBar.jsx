import React, { useContext } from "react";
import { Box, Stack } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { MusicContext } from "../../context/MusicContext";
import styles from "./MusicBar.module.css";

function formatArtists(artists) {
  if (Array.isArray(artists)) {
    return artists.join(", ");
  }
  return artists ?? "";
}

function MusicBar() {
  const { selectedSong, isPlaying, progress, togglePlay } =
    useContext(MusicContext);

  if (!selectedSong) {
    return null;
  }

  return (
    <div className={styles.bar}>
      <div className={styles.info}>
        <img src={selectedSong.image} alt={selectedSong.title} />
        <Stack>
          <span className={styles.songTitle}>{selectedSong.title}</span>
          <span className={styles.artists}>
            {formatArtists(selectedSong.artists)}
          </span>
        </Stack>
      </div>

      <div className={styles.playArea}>
        <button
          type="button"
          onClick={togglePlay}
          id="music-button"
          className={styles.playButton}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <PauseCircleIcon sx={{ color: "white", fontSize: 40 }} />
          ) : (
            <PlayCircleIcon sx={{ color: "white", fontSize: 40 }} />
          )}
        </button>

        <Box className={styles.progressWrap}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "#333",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "var(--color-primary)",
              },
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export default MusicBar;