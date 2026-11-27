import React, { useContext } from "react";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MusicContext } from "../../context/MusicContext";
import styles from "./AlbumDetails.module.css";

export default function SongsList({ currentSongs }) {
  const { playSong } = useContext(MusicContext);

  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.thTitleDesktop}>Title</TableCell>
            <TableCell className={styles.thTitleMobile}>Song</TableCell>
            <TableCell className={styles.thArtistDesktop}>Artist</TableCell>
            <TableCell className={styles.thDuration}>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentSongs.map((song) => (
            <TableRow
              key={song.id}
              onClick={() => playSong(song)}
              className={styles.songRow}
            >
              <TableCell className={styles.songCell}>
                <img src={song.image} alt={song.title} />
                <Stack spacing={0.5}>
                  <Typography component="span" className={styles.songTitle}>
                    {song.title}
                  </Typography>
                  <Typography component="span" className={styles.songArtistMobile}>
                    Artist: {formatArtists(song.artists)}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell className={styles.artistCell}>
                {formatArtists(song.artists)}
              </TableCell>
              <TableCell className={styles.durationCell}>
                {Math.ceil(song.durationInMs / 60000)} min
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function formatArtists(artists) {
  if (Array.isArray(artists)) {
    return artists.join(", ");
  }
  return artists ?? "";
}