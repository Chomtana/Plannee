import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {
  ListItem,
  List,
  ListItemText,
  Divider,
  TextField,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import VBox from "../../component/VBox";
import HBox from "../../component/HBox";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DepositDialog() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const [saveInfoChecked, setSaveInfoChecked] = React.useState(true);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        fullWidth
        style={{ marginTop: 10 }}
      >
        ออมเงิน
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        {page == 1 && (
          <>
            <DialogTitle>ออมเงินกับกองทุน</DialogTitle>
            <DialogContent>
              <DialogContentText>
                การออมเงินกับกองทุนจะทำให้คุณได้รับผลตอบแทนมากกว่าการออมเงินทั่วไป
                กรุณาเลือกกองทุนที่ต้องการ
              </DialogContentText>
              <List
                component="nav"
                style={{ border: "solid 1px #ccc", borderRadius: 20 }}
              >
                <ListItem button onClick={() => setPage(page + 1)}>
                  <ListItemText primary="KDLTF" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setPage(page + 1)}>
                  <ListItemText primary="KEQRMF" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setPage(page + 1)}>
                  <ListItemText primary="SCBSETE " />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setPage(page + 1)}>
                  <ListItemText primary="K70LTF" />
                </ListItem>
              </List>
              <DialogContentText style={{ color: "red", marginTop: 10 }}>
                * กองทุนที่เราเลือกมาให้นั้นคุณมักจะได้กำไร
                แต่การลงทุนก็มีความเสี่ยง
                ผู้ลงทุนโปรดศึกษาข้อมูลให้ดีก่อนเลือกลงทุน
              </DialogContentText>
            </DialogContent>
          </>
        )}

        {page == 2 && (
          <>
            <DialogTitle>เลือกวิธีการออมเงิน</DialogTitle>
            <DialogContent>
              <DialogContentText>
                กรุณาเลือกวิธีการออมเงินที่คุณต้องการ
              </DialogContentText>
              <List
                component="nav"
                style={{ border: "solid 1px #ccc", borderRadius: 20 }}
              >
                <ListItem button onClick={() => setPage(page + 1)}>
                  <ListItemText primary="Credit/Debit card" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setPage(page + 1)}>
                  <ListItemText primary="Mobile Banking" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setPage(page + 1)}>
                  <ListItemText primary="Rabbit Line Pay " />
                </ListItem>
              </List>
            </DialogContent>
          </>
        )}

        {page == 3 && (
          <>
            <DialogTitle>Credit/Debit card</DialogTitle>
            <DialogContent>
              <DialogContentText>
                กรุณากรอกข้อมูลบัตรเครดิตของคุณ
              </DialogContentText>
              <VBox gap={5}>
                <TextField label="Card Number" />
                <TextField label="Name on card" />
                <HBox gap={5}>
                  <TextField label="Expiration (MM/YY)" />
                  <TextField label="CVV" />
                </HBox>
                <FormControlLabel
                  control={
                    <Switch
                      checked={saveInfoChecked}
                      onChange={e => setSaveInfoChecked(e.target.checked)}
                      value="saveInfoChecked"
                      color="primary"
                    />
                  }
                  label="จดจำข้อมูลบัตรเครดิต"
                />
                <div style={{ color: "#aaa", marginTop: 5 }}>
                  เราจะเข้ารหัสข้อมูลของคุณ ข้อมูลของคุณไม่รั่วไหลแน่นอน
                </div>
              </VBox>
            </DialogContent>
          </>
        )}

        {page == 4 && (
          <>
            <DialogTitle>กรุณากรอกรหัส OTP</DialogTitle>
            <DialogContent>
              <DialogContentText>
                รหัส OTP ได้ถูกส่งไปยังมือถือของคุณแล้ว
              </DialogContentText>
              <TextField label="OTP" inputProps={{type: "number"}} fullWidth></TextField>
            </DialogContent>
          </>
        )}

        <DialogActions>
          {page > 1 && (
            <Button
              onClick={() => setPage(page - 1)}
              variant="contained"
              color="default"
            >
              ย้อนกลับ
            </Button>
          )}
          <Button onClick={handleClose} variant="contained" color="secondary">
            ยกเลิก
          </Button>
          {page >= 3 && (
            <Button
              onClick={() => setPage(page + 1)}
              variant="contained"
              color="primary"
            >
              ยืนยัน
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
