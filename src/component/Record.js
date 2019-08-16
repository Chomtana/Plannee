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
        center={
          <div style={{ marginLeft: 10 }}>
            <b>{props.record("category.name")()}</b>
            <br />
            {props.record("note")()}
          </div>
        }
        right={
          <div
            style={{
              paddingRight: 10,
              color: props.record("is_revenue")() ? "green" : "red",
              whiteSpace: "nowrap",
              fontSize: 16
            }}
          >
            {props.record("is_revenue")() ? "+ " : "- "}
            {props.record("value")()}
          </div>
        }
        style={merge(props.style, {
          padding: 10,
          borderRadius: 10,
          backgroundColor: "rgba(0,0,0,0.1)"
        })}
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
