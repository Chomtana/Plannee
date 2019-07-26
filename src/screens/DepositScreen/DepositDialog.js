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

export default function DepositDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  
  const [value, setValue] = React.useState(0);

  const [saveInfoChecked, setSaveInfoChecked] = React.useState(true);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <div onClick={handleClickOpen}>{props.button}</div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        {page == 1 && (
          <>
            <DialogTitle>กรุณาใส่จำนวนเงิน</DialogTitle>
            <DialogContent>
              <DialogContentText>
                กรุณาใส่จำนวนเงินที่คุณต้องการ{props.sellMode?"ขาย":"ออม"}
              </DialogContentText>
              <HBox>
                <Button onClick={()=>setValue(300)}>300</Button>
                <Button onClick={()=>setValue(500)}>500</Button>
                <Button onClick={()=>setValue(700)}>700</Button>
                <Button onClick={()=>setValue(1000)}>1000</Button>
              </HBox>
              <TextField label="จำนวนเงิน (บาท)" inputProps={{type: "number"}} value={value} onChange={e=>setValue(parseFloat(e.target.value))} fullWidth></TextField>
            </DialogContent>
          </>
        )}
      
        {page == 8 && (
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
                  <ListItemText primary="SCBSETE" />
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
            <DialogTitle>เลือกวิธีการ{props.sellMode?"รับ":"ออม"}เงิน</DialogTitle>
            <DialogContent>
              <DialogContentText>
                กรุณาเลือกวิธีการ{props.sellMode?"รับ":"ออม"}เงินที่คุณต้องการ
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
          {(page == 1 || page >= 3) && (
            <Button
              onClick={() => {
                if (page!=4) setPage(page + 1);
                else {
                  //add value or decrease value
                  var recordvalue = parseFloat(props.record("value")())
                  console.log(value, recordvalue, props.sellMode);
                  if (props.sellMode) {
                    recordvalue -= value;
                    if (recordvalue < 0) {
                      alert("มีเงินออมในกองทุนนี้ไม่เพียงพอ")
                    } else {
                      props.record("value").set(recordvalue);
                    }
                  } else {
                    recordvalue += value;
                    console.log(recordvalue);
                    props.record("value").set(recordvalue);
                  }
                  
                  handleClose();
                }
              }}
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
