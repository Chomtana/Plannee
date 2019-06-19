import React, { useState } from "react";

import LCRBox from "../LCRBox";
import VBox from "../VBox";
import HBox from "../HBox";

import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Collapse, Input } from "@material-ui/core";

import FastfoodIcon from "@material-ui/icons/Fastfood";

export default function NotEditing(props) {
  const [showAction, setShowAction] = useState(false);

  return (
    <VBox>
      <ButtonBase
        style={{ textAlign: "left" }}
        onClick={() => setShowAction(!showAction)}
      >
        <LCRBox
          left={
            <div style={{ alignSelf: "flex-start", marginTop: 3 }}>
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
      </ButtonBase>

      <Collapse in={showAction}>
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
      </Collapse>
    </VBox>
  );
}
