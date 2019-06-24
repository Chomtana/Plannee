import React, { useState } from "react";

import LCRBox from "../LCRBox";
import VBox from "../VBox";
import HBox from "../HBox";

import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Collapse, Input, Fade } from "@material-ui/core";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { useSelector } from 'react-redux'

export default function NotEditing(props) {
  const [showAction, setShowAction] = useState(false);
  const record = useSelector(state => state.records[props.i]);

  return (<>
    {(props.show && !record.isnew) &&
      <VBox>
        <ButtonBase
          style={{ textAlign: "left" }}
          onClick={() => setShowAction(!showAction)}
        >
          <LCRBox
            left={
              <div style={{ alignSelf: "flex-start" }}>
                <FastfoodIcon style={{ marginRight: 5 }} />
              </div>
            }
            center={
              <VBox style={{ alignSelf: "flex-start" }}>
                <div>{record.category}</div>
                <div>{record.note}</div>
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
                {record.value} บาท
              </div>
            }
          />
        </ButtonBase>

        <Collapse in={showAction}>
          <HBox style={{ marginBottom: 5 }}>
            <center>
              <Button size="medium" style={{ color: "darkred" }} onClick={props.onDelete}>
                <DeleteIcon />
                &nbsp;ลบ
              </Button>
            </center>
            <center>
              <Button size="medium" style={{ color: "darkblue" }} onClick={props.onEdit}>
                <EditIcon />
                &nbsp;แก้ไข
              </Button>
            </center>
            <center>
              <Button size="medium" style={{ color: "mediumorchid" }} onClick={props.onDup}>
                <FileCopyIcon />
                &nbsp;ทำซ้ำ
              </Button>
            </center>
            <center>
              <Button size="medium" style={{ color: "darkorange" }} onClick={props.onTransfer}>
                <ArrowForwardIcon />
                &nbsp;ย้าย
              </Button>
            </center>
          </HBox>
        </Collapse>
      </VBox>
    }
  </>);
}
