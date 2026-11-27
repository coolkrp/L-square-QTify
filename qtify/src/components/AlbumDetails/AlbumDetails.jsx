import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Pagination, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { BACKEND_ENDPOINT } from "../../api/backend";
import AlbumDetailsHeader from "./AlbumDetailsHeader";
import SongsList from "./SongsList";
import styles from "./AlbumDetails.module.css";

const SONGS_PER_PAGE = 13;

function AlbumDetails() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadAlbum = async () => {
      try {
        const [topResponse, newResponse] = await Promise.all([
          axios.get(`${BACKEND_ENDPOINT}/albums/top`),
          axios.get(`${BACKEND_ENDPOINT}/albums/new`),
        ]);
        const found = [...topResponse.data, ...newResponse.data].find(
          (item) => item.id === id
        );
        setAlbum(found ?? null);
      } catch {
        setAlbum(null);
      }
    };

    loadAlbum();
    setPage(1);
  }, [id]);

  if (!album) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const totalMinutes = Math.floor(
    album.songs.reduce((acc, song) => acc + song.durationInMs, 0) / 60000
  );

  const startIndex = (page - 1) * SONGS_PER_PAGE;
  const currentSongs = album.songs.slice(
    startIndex,
    startIndex + SONGS_PER_PAGE
  );

  const pageCount = Math.ceil(album.songs.length / SONGS_PER_PAGE);

  return (
    <Box className={styles.albumDetails}>
      <Stack className={styles.stack} spacing={2}>
        <AlbumDetailsHeader
          album={album}
          totalMinutes={totalMinutes}
        />

        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          size="small"
          className={styles.pagination}
          sx={{
            "& .MuiPaginationItem-root": { color: "white" },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "var(--color-primary)",
              color: "var(--color-black)",
            },
          }}
        />

        <SongsList currentSongs={currentSongs} />
      </Stack>
    </Box>
  );
}

export default AlbumDetails;