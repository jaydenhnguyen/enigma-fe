import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box, Button, IconButton, Typography } from '@mui/material';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
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
          borderRadius: 2,
          width: '1200px',
          margin: '5% auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            padding: 3,
            borderBottom: '1px solid #e0e0e0',
            flexShrink: 0,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            padding: 3,
            overflowY: 'auto',
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
        
        {onSave && (
          <Box
            sx={{
              padding: 3,
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              flexShrink: 0,
            }}
          >
            <Button variant="contained" onClick={onSave}>
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
