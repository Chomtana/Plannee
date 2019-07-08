import React from "react"
import VBox from './../../../component/VBox';
import HBox from './../../../component/HBox';
import {merge} from "lodash"

export default function SummaryText(props) {
  return <VBox style={merge(props.style,{marginRight: 50, paddingLeft: 20})}>
    <div style={{fontSize: 20}}>
      <HBox>
        <div style={{fontSize: 20}} ratio={2}>Balance:</div>
        <div style={{fontSize: 20,textAlign:"right"}} ratio={1}>7650</div>
      </HBox>
    </div>
    <div>
      <HBox>
        <div style={{fontSize: 17}} ratio={2}>Today Expense:</div>
        <div style={{fontSize: 17,textAlign:"right"}} ratio={1}>150</div>
      </HBox>
    </div>
  </VBox>
}