import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box, Button, IconButton, Typography } from '@mui/material';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onReset?: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
};

export function AppPopUp({ isOpen, onClose, onSave, onReset, title, children }: Props): React.ReactElement {
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
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          width: '1200px',
          margin: '5% auto',
          position: 'relative',
        }}
      >
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }} aria-label="close">
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
}
