import React, { useState } from "react";
import LCRBox from "../LCRBox";
import VBox from "../VBox";
import HBox from "../HBox";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import OKIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Close";

import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Collapse, Input } from "@material-ui/core";

import { merge } from "lodash";
import InlineInput from "../InlineInput";
import NotEditing from "./NotEditing";

import {useSelector, useDispatch} from 'react-redux'

export default function Editing(props) {
  const record = useSelector(state => state.records[props.i]);
  const dispatch = useDispatch()

  const [category,setCategory] = useState(record.category);
  const [note,setNote] = useState(record.note);
  const [value,setValue] = useState(record.value);
  

  return (<>
    {props.show &&
      <VBox>
        <LCRBox
          left={
            <div style={{ alignSelf: "flex-start", marginTop: 3 }}>
              <FastfoodIcon style={{ marginRight: 5 }} />
            </div>
          }
          center={
            <VBox>
              <div>{category}</div>
              <InlineInput value={note} onChange={(e)=>setNote(e.target.value)} />
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
              <HBox>
                <InlineInput value={value} style={{ minWidth: 60 }} onChange={(e)=>setValue(e.target.value)} />
                <div>บาท</div>
              </HBox>
            </div>
          }
        />

        <HBox>
          <center>
            <Button size="medium" style={{ color: "darkred" }} onClick={()=>{
              setNote(record.note); setCategory(record.category); setValue(record.value);
              props.onCancel(record);
            }}>
              <CancelIcon />
              &nbsp;ยกเลิก
            </Button>
          </center>
          <center>
            <Button size="medium" style={{ color: "darkblue" }} onClick={()=>{
              var newrecord = {category, note, value}
              dispatch({type:"change_record", i:props.i, data:newrecord})
              props.onSubmit(newrecord)
            }}>
              <OKIcon />
              &nbsp;ตกลง
            </Button>
          </center>
        </HBox>
      </VBox>
    }
  </>)
}