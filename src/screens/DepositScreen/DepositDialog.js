import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DepositDialog() {
  const [open, setOpen] = React.useState(false);


  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        ออมเงิน
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>ออมเงินกับกองทุน</DialogTitle>
        <DialogContent>
          <DialogContentText>
            การออมเงินกับกองทุนจะทำให้คุณได้รับผลตอบแทนมากกว่าการออมเงินทั่วไป
          </DialogContentText>
          <div>
            sddasasdasd
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}