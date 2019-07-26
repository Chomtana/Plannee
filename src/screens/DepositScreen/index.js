import React from "react";

import VBox from "../../component/VBox";
import usePointer from "../../pointer/usePointer";
import useStatePointer from "../../pointer/useStatePointer";
import BasicInput from "../../component/BasicInput";
import { Button } from "@material-ui/core";
import LCRBox from "../../component/LCRBox";
import DepositDialog from "./DepositDialog";

import { merge } from "lodash";
import HBox from "../../component/HBox";
import BackButton from "../../component/BackButton";

function DepositControl(props) {
  const amount = useStatePointer(0);

  return (
    <VBox style={{ padding: 10, backgroundColor: "white" }}>
      <BasicInput label="จำนวนเงินที่ออม" value={amount} fullWidth />
      <DepositDialog {...props} amount={amount} />
      {false && (
        <Button
          fullWidth
          onClick={() => {
            props.deposit.push({ amount: amount(), date: Date.now() });
          }}
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
        >
          ออมเงิน
        </Button>
      )}
    </VBox>
  );
}

function DepositRecordBak(props) {
  return (
    <LCRBox
      left={<div>{new Date(props.record("date")()).toLocaleDateString()}</div>}
      right={<div>{props.record("amount")()}</div>}
      style={merge(
        {
          borderRadius: 30,
          color: "white",
          backgroundColor: "#00be00",
          padding: 10,
          paddingTop: 15,
          paddingBottom: 15
        },
        props.style
      )}
    />
  );
}

function DepositRecord(props) {
  return (
    <LCRBox
      style={props.style}
      left={<div>{props.record.key}</div>}
      right={
        <div style={{ whiteSpace: "nowrap" }}>
          <HBox notfluid gap={10}>
            <div>{props.record("value")()}</div>
            <DepositDialog
              {...props}
              sellMode
              button={
                <Button style={{ color: "white", backgroundColor: "darkred" }}>
                  ขาย
                </Button>
              }
            />
            <DepositDialog
              {...props}
              button={
                <Button style={{ color: "white", backgroundColor: "#00be00" }}>
                  ซื้อ
                </Button>
              }
            />
          </HBox>
        </div>
      }
    />
  );
}

function DepositHistory(props) {
  return (
    <VBox gap={10} style={merge({ padding: 10 }, props.style)}>
      {props.deposit.map(record => (
        <DepositRecord record={record} {...props} />
      ))}
    </VBox>
  );
}

function DepositSummary(props) {
  return <div>Summary</div>;
}

export default function DepositScreen(props) {
  const deposit = usePointer("deposit");

  const line_detail = usePointer("line_detail");

  const more_params = { deposit };

  return (
    <VBox gap={15}>
      <BackButton />

      {line_detail("name").isReady && (
        <div style={{ fontSize: 18 }}>
          การออมเงินของคุณ{" "}
          <span style={{ fontSize: 20 }}>{line_detail("name")()}</span>
        </div>
      )}

      <div>
        การออมเงินกับกองทุนจะทำให้คุณได้รับผลตอบแทนมากกว่าการออมเงินทั่วไป
        กรุณาเลือกกองทุนที่ต้องการ
      </div>

      {false && <DepositControl {...props} {...more_params} />}
      {false && <DepositSummary {...props} {...more_params} />}
      <div style={{fontSize: 18}}>เลือกสรรโดย Plannee</div>
      <DepositHistory {...props} {...more_params} />

      <div style={{ color: "red", marginTop: 10 }}>
        * กองทุนที่เราเลือกมาให้นั้นคุณมักจะได้กำไร แต่การลงทุนก็มีความเสี่ยง
        ผู้ลงทุนโปรดศึกษาข้อมูลให้ดีก่อนเลือกลงทุน
      </div>
    </VBox>
  );
}
