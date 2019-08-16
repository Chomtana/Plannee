import React, { useState, useEffect } from "react";
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
import RefContainer from './../../refsystem/RefContainer';

export default function Editing(props) {
  const record = useSelector(state => state.records[props.i]);
  const dispatch = useDispatch()

  /*const [category,setCategory] = useState(record.category);
  const [note,setNote] = useState(record.note);
  const [value,setValue] = useState(record.value);

  useEffect(()=>{
    setCategory(record.category)
    setNote(record.note)
    setValue(record.value)
  },[record])*/

  const refs = new RefContainer(props);
  

  return (<>
    {(props.show || refs.record().isnew) &&
      <VBox>
        <LCRBox
          left={
            <div style={{ alignSelf: "flex-start" }}>
              <FastfoodIcon style={{ marginRight: 5 }} />
            </div>
          }
          center={
            <VBox>
              <ButtonBase style={{justifyContent:"left", color:"royalblue"}} onClick={()=>props.changeCategory_ref(refs.category)}>{refs.category.current || "เลือกหมวดหมู๋"}</ButtonBase>
              <InlineInput value={refs.note.current} onChange={(e)=>refs.note.stage(e.target.value)} />
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
                <InlineInput value={refs.value.current || ""} style={{ minWidth: 60 }} onChange={(e)=>refs.value.stage(e.target.value)} />
                <div>บาท</div>
              </HBox>
            </div>
          }
        />

        <HBox>
          <center>
            <Button size="medium" style={{ color: "darkred" }} onClick={()=>{
              if (!refs.record("isnew")()) {
                refs.note.reset(); refs.category.reset(); refs.value.reset();
                props.onCancel(record);
              } else {
                refs.record.pop();
                props.onCancel(record);
              }
            }}>
              <CancelIcon />
              &nbsp;ยกเลิก
            </Button>
          </center>
          <center>
            <Button size="medium" style={{ color: "darkblue" }} onClick={()=>{
              //console.log("asdasdasd")
              //refs.note.commit(); refs.category.commit(); refs.value.commit(); refs.record("isnew").set(false);
              refs.record("isnew").stage(false);
              refs.record.commit();
              props.onSubmit(refs.record())
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