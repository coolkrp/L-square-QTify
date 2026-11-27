import React, { useEffect, useRef, useState } from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import DropDown from "./DropDown";
import styles from "./Search.module.css";

function Search({ searchData, placeholder }) {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [searchWidth, setSearchWidth] = useState(502);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const goToAlbum = (album) => {
    if (!album) return;
    navigate(`/albumdetails/${album.id}`);
    setInputValue("");
    setValue(null);
    setOpen(false);
  };

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "qtify-search",
    options: searchData || [],
    getOptionLabel: (option) => option.title,
    value,
    onChange: (_, newValue) => {
      setValue(newValue);
      goToAlbum(newValue);
    },
    inputValue,
    onInputChange: (_, newInputValue) => {
      setInputValue(newInputValue);
      setOpen(newInputValue.trim().length > 0);
    },
    filterOptions: (options, state) => {
      const query = state.inputValue.trim().toLowerCase();
      if (!query) return [];
      return options.filter((option) =>
        option.title.toLowerCase().includes(query)
      );
    },
    open,
    onOpen: () => {
      if (inputValue.trim().length > 0) setOpen(true);
    },
    onClose: () => setOpen(false),
    isOptionEqualToValue: (option, selected) => option.id === selected?.id,
  });

  useEffect(() => {
    if (searchRef.current) {
      setSearchWidth(searchRef.current.offsetWidth);
    }
  }, []);

  const inputProps = getInputProps();

  return (
    <Box className={styles.container} ref={searchRef}>
      <div {...getRootProps()}>
        <form
          className={styles.wrapper}
          onSubmit={(e) => {
            e.preventDefault();
            if (value) {
              goToAlbum(value);
              return;
            }
            if (groupedOptions.length === 1) {
              goToAlbum(groupedOptions[0]);
            }
          }}
        >
          <input
            {...inputProps}
            name="album"
            className={styles.search}
            placeholder={placeholder}
            required
          />
          <button className={styles.searchButton} type="submit" aria-label="Search">
            <SearchIcon />
          </button>
        </form>

        <DropDown
          getListboxProps={getListboxProps}
          groupedOptions={groupedOptions}
          getOptionProps={getOptionProps}
          searchWidth={searchWidth}
        />
      </div>
    </Box>
  );
}

export default Search;