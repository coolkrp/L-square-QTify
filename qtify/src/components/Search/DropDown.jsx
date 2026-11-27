import { Box, ListItem, Stack, styled, Typography } from "@mui/material";
import { truncate } from "../../helpers/helpers";
import styles from "./Search.module.css";

const Listbox = styled("ul")({
  width: "100%",
  margin: 0,
  padding: 0,
  position: "absolute",
  borderRadius: "0px 0px 10px 10px",
  border: "1px solid var(--color-primary)",
  top: "100%",
  height: "max-content",
  maxHeight: "300px",
  zIndex: 1000,
  overflowY: "auto",
  listStyle: "none",
  backgroundColor: "var(--color-black)",
  color: "white",
  "& li.Mui-focused": {
    backgroundColor: "#2d2d2d",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#363636",
    color: "white",
  },
});

function getAlbumArtists(option) {
  const artists = option.songs?.reduce((accumulator, song) => {
    if (Array.isArray(song.artists)) {
      accumulator.push(...song.artists);
    } else if (song.artists) {
      accumulator.push(song.artists);
    }
    return accumulator;
  }, []);
  return artists ?? [];
}

export default function DropDown({
  getListboxProps,
  groupedOptions,
  getOptionProps,
  searchWidth,
}) {
  if (!groupedOptions?.length) {
    return null;
  }

  return (
    <Listbox {...getListboxProps()} style={{ width: searchWidth || 502 }}>
      {groupedOptions.map((option, index) => {
        const artists = getAlbumArtists(option);
        const { key, ...optionProps } = getOptionProps({ option, index });

        return (
          <ListItem key={key} {...optionProps} className={styles.listElement}>
            <Stack sx={{ textAlign: "left", width: "100%" }}>
              <Box sx={{ display: "flex", gap: "16px" }}>
                <Box
                  component="img"
                  src={option.image}
                  alt={option.title}
                  className={styles.image}
                />
                <Stack sx={{ justifyContent: "center", width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
                    <Typography
                      component="span"
                      className={styles.albumTitle}
                      sx={{ fontFamily: "Poppins" }}
                    >
                      {option.title}
                    </Typography>
                    <Typography
                      component="span"
                      className={styles.albumTitle}
                      sx={{ fontFamily: "Poppins", flexShrink: 0 }}
                    >
                      {option.follows} Follows
                    </Typography>
                  </Box>
                  <Typography
                    component="span"
                    className={styles.albumArtists}
                    sx={{ fontFamily: "Poppins" }}
                  >
                    {truncate(artists.join(", "), 40)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </ListItem>
        );
      })}
    </Listbox>
  );
}