import React from "react";
import { Modal, Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type EmptyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onReset?: () => void;
  title?: string;
  children: React.ReactNode;
};

export const EmptyModule: React.FC<EmptyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onReset,
  title = "Modal Title",
  children,
}) => {

    const handleClose = () => {
    if (onReset) {
      onReset();
    }
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          width: "400px",
          margin: "10% auto",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Box>{children}</Box>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>

          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};