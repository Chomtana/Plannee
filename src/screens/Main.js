import React, { useState } from "react";

import VBox from "../component/VBox";
import HBox from "../component/HBox";
import LCRBox from "../component/LCRBox";
import UICard from "../component/UICard";
import RecordItem from "../component/RecordItem";
import { useSelector, useDispatch } from 'react-redux';

import { Button, Collapse, Input } from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add'
import ReceiveIcon from '@material-ui/icons/CallReceived'
import SelectCategoriesDialog from "../component/RecordItem/SelectCategoriesDialog";

import { cloneDeep } from 'lodash';

export default function Main() {
  const records = useSelector(state => state.records);
  const dispatch = useDispatch();

  const [choosing_i,setChoosing_i] = useState(null);
  console.log(choosing_i)

  return (
    <div>
      <VBox gap={20}>
        <UICard title="สรุปบัญชีรายรับรายจ่าย">
          <VBox>
            <HBox>
              <div>รายรับ</div>
              <div style={{ textAlign: "right" }}>1000 บาท</div>
            </HBox>
            <HBox>
              <div>รายจ่าย</div>
              <div style={{ textAlign: "right" }}>800 บาท</div>
            </HBox>
            <HBox>
              <div>คงเหลือ</div>
              <div style={{ textAlign: "right" }}>200 บาท</div>
            </HBox>
          </VBox>
        </UICard>

        <UICard
          title={
            <>
              วันนี้&nbsp;
              <span style={{ fontSize: "12pt" }}>19 มิถุนายน 2562</span>
            </>
          }
        >
          {records.length>0 ? 
            records.map((record,i)=> <RecordItem i={i} style={{marginBottom:5}} key={i} changeCategory_i={(catei)=>setChoosing_i(catei)}/> ) 
            : <center>--- ไม่มีรายการ ---</center>
          }

          <hr />

          <HBox>
            <center>
              <Button size="medium" style={{ color: "darkred" }} onClick={()=>{
                
              }}>
                <ReceiveIcon />
                &nbsp;รับเงินเข้า
              </Button>
            </center>
            <center>
              <Button size="medium" style={{ color: "darkblue" }} onClick={()=>{
                dispatch({type:"add_record"})
              }}>
                <AddIcon />
                &nbsp;เพิ่มรายการ
              </Button>
            </center>
          </HBox>
        </UICard>
      </VBox>

      <SelectCategoriesDialog
        open={choosing_i !== null} 
        onClose={()=>{
          setChoosing_i(null)
        }}
        onChoose={(val)=>{
          let record = cloneDeep(records[choosing_i]);
          record.category = val.text;
          console.log(record,val)
          dispatch({type: "change_record", i: choosing_i, data: record, preserve_isnew: true})
          setChoosing_i(null)
        }}
      ></SelectCategoriesDialog>
    </div>
  );
}
