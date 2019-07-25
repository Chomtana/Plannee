import React from "react";

import VBox from "../../component/VBox";
import usePointer from "../../pointer/usePointer";
import useStatePointer from "../../pointer/useStatePointer";
import BasicInput from "../../component/BasicInput";
import { Button } from "@material-ui/core";
import LCRBox from "../../component/LCRBox";

import {merge} from "lodash"

function DepositControl(props) {
  const amount = useStatePointer(0);

  return (
    <VBox style={{padding:10, backgroundColor: "white"}}>
      <BasicInput label="จำนวนเงินที่ออม" value={amount} fullWidth />
      <Button
        fullWidth
        onClick={() => {
          props.deposit.push({ amount: amount(), date: Date.now() });
        }}
        variant="contained"
        color="primary"
        style={{marginTop: 10}}
      >
        ออมเงิน
      </Button>
    </VBox>
  );
}

function DepositRecord(props) {
  return (
    <LCRBox
      left={<div>{new Date(props.record("date")()).toLocaleDateString()}</div>}
      right={<div>{props.record("amount")()}</div>}
      style={merge({
        borderRadius: 30,
        color: "white",
        backgroundColor: "#00be00",
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15
      }, props.style)}
    />
  );
}

function DepositHistory(props) {
  return (
    <VBox gap={10}>
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

  const more_params = { deposit };

  return (
    <VBox gap={15}>
      <DepositControl {...props} {...more_params} />
      <DepositSummary {...props} {...more_params} />
      <DepositHistory {...props} {...more_params} />
    </VBox>
  );
}
