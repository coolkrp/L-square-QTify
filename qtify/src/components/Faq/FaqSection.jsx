import React, { useEffect, useState } from "react";
import axios from "axios";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { BACKEND_ENDPOINT } from "../../api/backend";
import styles from "./FaqSection.module.css";

function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_ENDPOINT}/faq`);
        setFaqs(data.data ?? []);
      } catch {
        setFaqs([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFaqs();
  }, []);

  return (
    <section className={styles.section}>
      <Typography component="h2" className={styles.title}>
        FAQs
      </Typography>

      {isLoading ? (
        <Box className={styles.loader}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <div className={styles.list}>
        {faqs.map((faq, index) => (
          <Accordion
            key={faq.question ?? index}
            className={styles.accordion}
            disableGutters
            elevation={0}
            sx={{
              backgroundColor: "var(--color-black)",
              color: "var(--color-white)",
              "&::before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMore sx={{ color: "var(--color-primary)" }} />
              }
              className={styles.summary}
            >
              {faq.question}
            </AccordionSummary>
            <AccordionDetails className={styles.details}>
              {faq.answer}
            </AccordionDetails>
          </Accordion>
        ))}
        </div>
      )}
    </section>
  );
}

export default FaqSection;