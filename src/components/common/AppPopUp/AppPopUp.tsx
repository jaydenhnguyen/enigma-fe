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
    <Modal      sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          maxWidth: '90vw', 
          padding: '10px',
          maxHeight: '90vh',
          margin: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }} aria-label="close">
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Box     sx={{
            overflowY: 'auto',
            px: 4,
            py: 2,
            flexGrow: 1,
            flexShrink: 1,
            minHeight: 0 // Important for Firefox
          }}>{children}</Box>

        <Box sx={{ p: 4, pt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
