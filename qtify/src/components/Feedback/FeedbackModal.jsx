import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import styles from "./FeedbackModal.module.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "var(--color-black)",
  border: "2px solid var(--color-primary)",
  boxShadow: 24,
  p: 3,
  borderRadius: "12px",
};

const textFieldStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    color: "var(--color-white)",
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "var(--color-primary)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color-primary)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "grey",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--color-primary)",
  },
};

function FeedbackModal({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    enqueueSnackbar("Thank you! Your feedback has been submitted.", {
      variant: "success",
    });
    setForm({ name: "", email: "", subject: "", description: "" });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="feedback-modal-title"
      sx={{ zIndex: 4000 }}
    >
      <Box sx={modalStyle}>
        <Stack
          component="form"
          spacing={2}
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <Box className={styles.header}>
            <Typography id="feedback-modal-title" className={styles.heading}>
              Feedback
            </Typography>
            <Close onClick={onClose} className={styles.close} />
          </Box>

          <TextField
            required
            id="name"
            label="Full Name"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            required
            id="email"
            label="Email ID"
            type="email"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            required
            id="subject"
            label="Subject"
            variant="outlined"
            size="small"
            sx={textFieldStyle}
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
          <TextField
            required
            id="description"
            label="Description"
            variant="outlined"
            size="small"
            multiline
            minRows={4}
            sx={textFieldStyle}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <Button type="submit" variant="contained" className={styles.submit}>
            Submit Feedback
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default FeedbackModal;