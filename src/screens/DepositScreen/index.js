import React from "react";

import VBox from "../../component/VBox";
import usePointer from "../../pointer/usePointer";
import useStatePointer from "../../pointer/useStatePointer";
import BasicInput from "../../component/BasicInput";
import { Button } from "@material-ui/core";
import LCRBox from "../../component/LCRBox";
import DepositDialog from "./DepositDialog";

function DepositControl(props) {
  const amount = useStatePointer(0);

  return (
    <VBox>
      <BasicInput label="จำนวนเงินที่ออม" value={amount} fullWidth />
      <DepositDialog {...props} amount={amount}></DepositDialog>
      {false && <Button
        fullWidth
        onClick={() => {
          props.deposit.push({ amount: amount, date: Date.now() });
        }}
      >
        ออมเงิน
      </Button>}
    </VBox>
  );
}

function DepositRecord(props) {
  return (
    <LCRBox
      left={<div>{props.record("amount")()}</div>}
      right={
        <div>
          {props
            .record("date")()
            .toLocaleDateString()}
        </div>
      }
    />
  );
}

function DepositHistory(props) {
  return (
    <VBox>
      {props.deposit.map(record => (
        <DepositRecord record={record} {...props} />
      ))}
    </VBox>
  );
}

function DepositSummary(props) {
  return <div>Summary</div>
}

export default function DepositScreen(props) {
  const deposit = usePointer("deposit");

  const more_params = { deposit };

  return (
    <VBox>
      <DepositControl {...props} {...more_params} />
      <DepositSummary {...props} {...more_params} />
      <DepositHistory {...props} {...more_params} />
    </VBox>
  );
}
