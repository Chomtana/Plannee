import React from "react";
import LCRBox from "../LCRBox";
import VBox from "../VBox";
import HBox from "../HBox";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import Button from "@material-ui/core/Button";

export default function RecordItem(props) {
  return (
    <VBox>
      <Button>
        <LCRBox
          left={
            <div>
              <FastfoodIcon style={{ marginRight: 5 }} />
            </div>
          }
          center={
            <VBox>
              <div>{props.category}</div>
              <div>{props.note}</div>
            </VBox>
          }
          right={
            <div
              style={{
                whiteSpace: "nowrap",
                alignSelf: "flex-start",
                marginLeft: 5
              }}
            >
              {props.value} บาท
            </div>
          }
        />
      </Button>

      <HBox>
        <Button size="medium" style={{ color: "darkred" }}>
          <DeleteIcon />
          &nbsp;ลบ
        </Button>
        <Button size="medium" style={{ color: "darkblue" }}>
          <EditIcon />
          &nbsp;แก้ไข
        </Button>
        <Button size="medium" style={{ color: "mediumorchid" }}>
          <FileCopyIcon />
          &nbsp;ทำซ้ำ
        </Button>
        <Button size="medium" style={{ color: "darkorange" }}>
          <ArrowForwardIcon />
          &nbsp;ย้าย
        </Button>
      </HBox>
    </VBox>
  );
}
