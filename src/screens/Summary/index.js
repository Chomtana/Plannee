import React from "react"
import VBox from './../../component/VBox';
import SummaryChart from "../../component/SummaryChart";
import SummaryText from "../../component/SummaryText";



function ControlPanel(props) {
  return <div>CTRLPANEL</div>
}

export default function Summary(props) {
  return (
    <VBox>
      <div style={{display:"flex", justifyContent:"center"}}>
        <SummaryChart fullWidth></SummaryChart>
      </div>
      <ControlPanel></ControlPanel>
      <SummaryText></SummaryText>
    </VBox>
  )
}