import React from "react"
import VBox from "../../component/VBox";
import LCRBox from "../../component/LCRBox";
import { Input, Button } from "@material-ui/core";
import useStatePointer from "../../pointer/useStatePointer";
import BasicInput from "../../component/BasicInput";

export default function PaidControl(props) {
  const value = useStatePointer(0);
  
  return <VBox>
    <LCRBox
      center={<BasicInput label={"จำนวนเงิน (บาท)"} value={value} setWrapper={parseFloat}></BasicInput> }
      right={<Button>จ่ายเงิน</Button>}
    ></LCRBox>
  </VBox>
}