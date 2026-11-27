import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Box, CircularProgress } from "@mui/material";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import Tabs from "../Tabs/Tabs";
import styles from "./Section.module.css";

const Section = ({ title, apiUrl, type }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchSectionData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(apiUrl);
        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        if (err.response?.status === 500) {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar(
            "Could not fetch data. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" }
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectionData();
  }, [apiUrl, enqueueSnackbar]);

  const toggleLayout = () => {
    setIsCollapsed((prev) => !prev);
  };

  const renderCard = (item) => <Card data={item} type={type} />;

  if (isLoading) {
    return (
      <section className={styles.body}>
        <Box className={styles.loader}>
          <CircularProgress color="success" />
        </Box>
      </section>
    );
  }

  return (
    <section className={styles.body}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {type !== "song" && (
          <button
            type="button"
            className={styles.collapse}
            onClick={toggleLayout}
          >
            {isCollapsed ? "Show All" : "Collapse"}
          </button>
        )}
      </div>

      {type === "song" && (
        <Tabs allItems={items} setFilter={setFilteredItems} />
      )}

      {isCollapsed ? (
        <Carousel
          data={filteredItems}
          callback={renderCard}
          type={type}
        />
      ) : (
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.gridItem}>
              {renderCard(item)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Section;