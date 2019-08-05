import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LCRBox from "./LCRBox";
import VBox from "./VBox";
import { MenuItem, Select, Input, FormControl } from "@material-ui/core";
import CategoryIcon from "./CategoryIcon";
import SelectCategoriesDialog from "./SelectCategoriesDialog";
import useStatePointer from "../pointer/useStatePointer";
import InputLabel from "@material-ui/core/InputLabel";
import BasicInput from "./BasicInput";
import { DatePicker } from "@material-ui/pickers";

function Category(props) {
  const is_choosing = useStatePointer(false);

  return (
    <VBox>
      <div>หมวดหมู่</div>
      <Button
        style={{ textAlign: "left" }}
        onClick={() => is_choosing.set(true)}
      >
        <LCRBox
          left={<CategoryIcon category={props.record("category")} />}
          center={
            <div style={{ marginLeft: 5 }}>
              {props.record("category")("name")()}
            </div>
          }
        />
      </Button>
      <SelectCategoriesDialog
        is_choosing={is_choosing}
        category={props.record("category")}
      />
    </VBox>
  );
}

function RecordType(props) {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="record-type-input">
        ชนิด (รายรับ / รายจ่าย)
      </InputLabel>
      <Select
        fullWidth
        input={<Input style={{ width: "100%" }} id="record-type-input" />}
        value={props.record("is_revenue")()}
        onChange={e => props.record("is_revenue").set(e.target.value)}
      >
        <MenuItem value={0}>รายจ่าย</MenuItem>
        <MenuItem value={1}>รายรับ</MenuItem>
      </Select>
    </FormControl>
  );
}

function Value(props) {
  return (
    <LCRBox
      center={
        <BasicInput
          autoFocus
          margin="dense"
          label="ราคา"
          type="number"
          value={props.record("value")}
          /*onChange={e => props.record("value").set(parseFloat(e.target.value))}*/
          setWrapper={parseFloat}
          inputProps={{
            step: "any"
          }}
          fullWidth
        />
      }
      right={
        <div
          style={{
            whiteSpace: "nowrap",
            alignSelf: "flex-end",
            marginBottom: 10
          }}
        >
          บาท
        </div>
      }
    />
  );
}

function Note(props) {
  return (
    <BasicInput
      fullWidth
      value={props.record("note")}
      /*onChange={e => props.record("note").set(e.target.value)}*/
      label="บันทึก"
    />
  );
}

function DateInput(props) {
  return (
    <DatePicker
      format="dd/MM/yyyy"
      label="วันที่"
      value={props.record("date")()}
      onChange={val => props.record("date").set(val)}
      fullWidth
    />
  )
}

export default function RecordUpdate(props) {
  function handleClose() {
    props.open.set(false);
    props.onClose && props.onClose(props.record);
  }

  function handleSubmit() {
    props.onSubmit && props.onSubmit(props.record);
    handleClose();
  }

  function handleCancel() {
    props.onCancel && props.onCancel(props.record);
    handleClose();
  }

  return (
    <div>
      <Dialog open={props.open()} onClose={handleClose} fullWidth={true}>
        <DialogTitle id="form-dialog-title">
          {props.createMode ? "เพิ่ม" : "แก้ไข"}รายการ
        </DialogTitle>
        <DialogContent>
          <VBox gap={10}>
            <div><Category {...props} /></div>
            <div><RecordType {...props} /></div>
            <div><Value {...props} /></div>
            <div><Note {...props} /></div>
            <div><DateInput {...props} /></div>
          </VBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={handleSubmit} color="primary">
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
