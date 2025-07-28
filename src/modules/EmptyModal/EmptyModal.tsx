import React from "react";
import { Modal, Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import classes from './EmptyModal.module.scss';

type EmptyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onReset?: () => void;
  title?: string;
  children: React.ReactNode;
};

export const EmptyModal: React.FC<EmptyModalProps> = ({
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
    <Modal className={classes['modal']} open={isOpen} onClose={handleClose} >
      <Box className={classes['popup-container']}
  
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

        <Box className={classes['save-button']}>

          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};