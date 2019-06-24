import React, { useState } from "react";

import VBox from "../component/VBox";
import HBox from "../component/HBox";
import LCRBox from "../component/LCRBox";
import UICard from "../component/UICard";
import { useSelector, useDispatch } from 'react-redux';

import { Button, ButtonBase, Collapse, Input } from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add'
import ReceiveIcon from '@material-ui/icons/CallReceived'
import SelectCategoriesDialog from "../component/SelectCategoriesDialog";

import { cloneDeep, merge } from 'lodash';
import RefContainer from './../refsystem/RefContainer';
import useSelectorRef from "../refsystem/useSelectorRef";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import useStateRef from './../refsystem/useStateRef';

import OKIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Close";
import InlineInput from "../component/InlineInput";
import Icon from "../component/Icon";
import createGlobalRef from './../refsystem/createGlobalRef';
import useGlobalRef from './../refsystem/useGlobalRef';
import Link from './../router/Link';

function CategoryIcon(props) {
  const refs = new RefContainer(props);

  const null_category = {
    icon: "help_outline",
    icon_type: "material",
    icon_background: "#414042",
    text: "อื่นๆ"
  }

  const category = refs.category.current;

  return (<>
    {category ?
      <Icon icon={category.icon} type={category.icon_type} color="white" bgColor={category.icon_background} size={24} />
      :
      <Icon icon={null_category.icon} type={null_category.icon_type} color="white" bgColor={null_category.icon_background} size={24} />
    }
  </>)
}

function Editing(props) {
  const refs = new RefContainer(props);
  refs.is_choosing = useStateRef(false);

  return (<>
    {refs.is_editing() &&
      <VBox {...props}>
        <LCRBox
          left={
            <div style={{ marginRight: 5, alignSelf: "top" }}>
              <CategoryIcon {...refs}></CategoryIcon>
            </div>
          }

          center={
            <VBox>
              <ButtonBase style={{ justifyContent: "left", color: "royalblue" }} onClick={()=>refs.is_choosing.set(true)}>{refs.category("text").current || "เลือกหมวดหมู่"}</ButtonBase>
              <InlineInput value={refs.note.current} onChange={(event) => refs.note.stage(event.target.value)}></InlineInput>
            </VBox>
          }

          right={
            <div style={{ alignSelf: "flex-start", whiteSpace: "nowrap", marginLeft: 5 }}>
              <HBox>
                <InlineInput value={refs.value.current} onChange={(event) => refs.value.stage(event.target.value)} style={{ minWidth: 60 }}></InlineInput>
                <div>บาท</div>
              </HBox>
            </div>
          }
        />

        <HBox style={{ marginBottom: 5 }}>
          <center>
            <Button size="medium" style={{ color: "darkred" }} onClick={() => {
              refs.record.reset();
              refs.is_editing.set(false);
            }}>
              <CancelIcon />
              &nbsp;ยกเลิก
          </Button>
          </center>
          <center>
            <Button size="medium" style={{ color: "darkblue" }} onClick={() => { refs.record("isnew").set(false); refs.record.commit(); refs.is_editing.set(false); }}>
              <OKIcon />
              &nbsp;ตกลง
          </Button>
          </center>
        </HBox>

        <SelectCategoriesDialog
          open={refs.is_choosing()}
          {...refs}
        ></SelectCategoriesDialog>
      </VBox>
    }</>)
}

function NotEditing(props) {
  const refs = new RefContainer(props);
  const [showAction, setShowAction] = useState(false);

  const category = refs.category();

  return (<>
    {!refs.is_editing() &&
      <VBox {...props}>
        <ButtonBase
          style={{ textAlign: "left" }}
          onClick={() => setShowAction(!showAction)}
        >
          <LCRBox
            left={
              <div style={{ marginRight: 5, alignSelf: "top" }}>
                <CategoryIcon {...refs}></CategoryIcon>
              </div>
            }

            center={
              <VBox>
                <div>{refs.category("text")()}</div>
                <div>{refs.note()}</div>
              </VBox>
            }

            right={
              <div style={{ alignSelf: "flex-start", whiteSpace: "nowrap", marginLeft: 5 }}>
                {refs.value()} บาท
            </div>
            }
          />
        </ButtonBase>

        <Collapse in={showAction}>
          <HBox style={{ marginBottom: 5 }}>
            <center>
              <Button size="medium" style={{ color: "darkred" }} onClick={() => refs.record.delete()}>
                <DeleteIcon />
                &nbsp;ลบ
          </Button>
            </center>
            <center>
              <Button size="medium" style={{ color: "darkblue" }} onClick={() => { refs.is_editing.set(true); setShowAction(false) }}>
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
    }</>)
}

function RecordItem(props) {
  const refs = new RefContainer(props);
  refs.is_editing = useStateRef(props.force_editing || false);

  return (<>
    <NotEditing {...refs} {...props}></NotEditing>
    <Editing {...refs} {...props}></Editing>
  </>)
}

function UICard_TodayRecord(props) {
  const refs = new RefContainer(props);

  return (
    <UICard
      title={
        <>
          วันนี้&nbsp;
        <span style={{ fontSize: "12pt" }}>19 มิถุนายน 2562</span>
        </>
      }
      {...props}
    >
      {refs.records().length > 0 ?
        refs.records.allMap((record, i) => {
          return <RecordItem
            {...refs}
            record={record}
            category={record("category")}
            note={record("note")}
            value={record("value")}
            style={{ marginBottom: 5 }}
            force_editing={record.is_staging()}
            key={i}
          />
        })
        : <center>--- ไม่มีรายการ ---</center>
      }

      <hr />

      <HBox>
        <center>
          <Button size="medium" style={{ color: "darkred" }} onClick={() => {

          }}>
            <ReceiveIcon />
            &nbsp;รับเงินเข้า
        </Button>
        </center>
        <center>
          <Button size="medium" style={{ color: "darkblue" }} onClick={() => {
            refs.records.stagePush({ category: null, note: "", value: null, isnew: true })
          }}>
            <AddIcon />
            &nbsp;เพิ่มรายการ
        </Button>
        </center>
      </HBox>
    </UICard>
  )
}

function UICard_Summary_Income(props) {
  const refs = new RefContainer(props);

  return (
    <HBox {...props}>
      <div>รายรับ</div>
      <div style={{ textAlign: "right", color: "green" }}>1000 บาท</div>
    </HBox>
  )
}

function UICard_Summary_Expense(props) {
  const refs = new RefContainer(props);

  var records = refs.records();
  var sum = 0;
  records.map(record => sum += parseInt(record.value));

  return (
    <HBox {...props}>
      <div>รายจ่าย</div>
      <div style={{ textAlign: "right", color: "darkred" }}>{sum} บาท</div>
    </HBox>
  )
}

function UICard_Summary_Remaining(props) {
  const refs = new RefContainer(props);

  var records = refs.records();
  var sum = 0;
  records.map(record => sum += parseInt(record.value));
  sum = 1000 - sum;

  return (
    <HBox {...props}>
      <div>คงเหลือ</div>
      <div style={{ textAlign: "right", color: "green" }}>{sum} บาท</div>
    </HBox>
  )
}

function UICard_Summary(props) {
  const refs = new RefContainer(props);

  return (
    <UICard title="สรุปบัญชีรายรับรายจ่าย" {...props}>
      <VBox>
        <UICard_Summary_Income {...refs}></UICard_Summary_Income>
        <UICard_Summary_Expense {...refs}></UICard_Summary_Expense>
        <UICard_Summary_Remaining {...refs}></UICard_Summary_Remaining>
      </VBox>
      <VBox>
        <Link to={["summary"]}><Button style={{width:"100%", marginTop: 5}} variant="contained" color="primary">ดูสรุปอย่างละเอียด</Button></Link>
      </VBox>
    </UICard>
  )
}


export default function Main() {
  const dispatch = useDispatch();

  const refs = new RefContainer();
  //refs.records = useSelectorRef("records");
  refs.records = useGlobalRef("records");
  refs.choosing_category = useStateRef(null);

  console.log(refs.choosing_category())

  return (
    <div>
      <VBox gap={20}>
        <UICard_Summary {...refs}></UICard_Summary>
        <UICard_TodayRecord {...refs}></UICard_TodayRecord>
      </VBox>
    </div>
  );
}
