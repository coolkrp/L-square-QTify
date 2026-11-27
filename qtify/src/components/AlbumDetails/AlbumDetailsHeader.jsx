import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./AlbumDetails.module.css";

export default function AlbumDetailsHeader({ album, totalMinutes }) {
  const navigate = useNavigate();

  return (
    <Box className={styles.header}>
      <ArrowCircleLeftOutlined
        onClick={() => navigate("/")}
        className={styles.backIcon}
      />
      <Box
        component="img"
        src={album.image}
        alt={album.title}
        className={styles.cover}
      />
      <Stack spacing={1} className={styles.meta}>
        <Typography component="h1" className={styles.albumName}>
          {album.title}
        </Typography>
        <Typography component="p" className={styles.description}>
          {album.description}
        </Typography>
        <Typography component="p" className={styles.stats}>
          {`${album.songs.length} songs • ${totalMinutes} min • ${album.follows} Follows`}
        </Typography>
      </Stack>
    </Box>
  );
}