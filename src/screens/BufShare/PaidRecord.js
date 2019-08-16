import React from "react"
import VBox from "../../component/VBox";
import LCRBox from "../../component/LCRBox";

export default function PaidRecord(props) {
  return (
    <LCRBox
      left={<div>Pic</div>}
      center={<div>Name</div>}
      right={<div style={{whiteSpace: "nowrap"}}>200 บาท</div>}
    >  
    </LCRBox>
  )
}