import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalAboutApp({ handleOpen, handleClose, open, setOpen }) {
  return (
    <Box mt={8}>
      <Box
        onClick={handleOpen}
        sx={{
          display: 'flex',
          flexDirection: 'rows',
          justifyContent: 'center',
          fontSize: 13,
        }}
      >
        <IconButton color="inherit">
          <Typography fontSize={13} textAlign="center">
            About App
          </Typography>
          <HelpOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography textAlign="center" id="modal-modal-title" variant="h6" component="h2">
            About this App
          </Typography>
          <Typography textAlign="center" id="modal-modal-description" sx={{ mt: 2 }}>
            This application is a demo project for a social media application
          </Typography>
          <Typography textAlign="center" id="modal-modal-description" sx={{ mt: 1 }}>
            To feel the experience of using this application, you can use a demo account, or you can create your own account
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
