import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertBox = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      role="alertdialog"
    >
      <DialogTitle id="alert-dialog-title">
        Confirm Delete Operation
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this book?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button onClick={handleConfirm} color="error" autoFocus>
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertBox;
