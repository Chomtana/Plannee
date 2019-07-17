import React, { useState } from "react";
import HBox from "./HBox";
import LCRBox from "./LCRBox";
import CategoryIcon from "./CategoryIcon";
import { merge } from "lodash";
import VBox from "./VBox";
import useStatePointer from "../pointer/useStatePointer";
import RecordUpdate from "./RecordUpdate";
import { Button, ButtonBase } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Collapse } from "@material-ui/core";

function NotEditing(props) {
  return (
    <div onClick={props.onClick}>
      <LCRBox
        left={<CategoryIcon category={props.record("category")} />}
        center={<div style={{ marginLeft: 20 }}>{props.record("note")()}</div>}
        right={
          <div style={{ paddingRight: 50 }}>{props.record("value")()}</div>
        }
        style={merge(props.style, { height: 45, paddingLeft: 20 })}
      />
    </div>
  );
}

function EditingMenu(props) {
  const showEditModal = useStatePointer(false);

  return (
    <div style={{ marginBottom: 10 }}>
      <HBox>
        <ButtonBase
          onClick={() => props.record.delete()}
          style={{ color: "darkred" }}
        >
          <DeleteIcon /> ลบ
        </ButtonBase>
        <ButtonBase
          onClick={() => showEditModal.set(true)}
          style={{ color: "darkblue" }}
        >
          <EditIcon /> แก้ไข
        </ButtonBase>
        <RecordUpdate {...props} open={showEditModal} />
      </HBox>
    </div>
  );
}

export default function Record(props) {
  const [editing, setEditing] = useState(false);

  //props.record
  return (
    <div>
      <NotEditing {...props} onClick={() => setEditing(!editing)} />
      <Collapse in={editing}>
        <EditingMenu {...props} />
      </Collapse>
    </div>
  );
}
