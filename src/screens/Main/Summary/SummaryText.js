import React from "react"
import VBox from './../../../component/VBox';
import HBox from './../../../component/HBox';
import {merge} from "lodash"
import sumByCategory from "../../../action/sumByCategory";
import usePointer from "../../../pointer/usePointer";

export default function SummaryText(props) {
  var sum_by_category = sumByCategory(props.records, props.categories);
  
  const line_detail = usePointer("line_detail");
  const user_detail = usePointer("user_detail");

  var total = 0;
  for (var x in sum_by_category) total += sum_by_category[x];

  return <VBox style={merge(props.style,{marginRight: 50, paddingLeft: 20})}>
    <div style={{fontSize: 20, whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
      {line_detail("name")() || user_detail("name")()}
    </div>
    {false && line_detail("statusMessage").isReady && (
        <div style={{ marginBottom: 10, fontSize: 16, color: "#999" }}>
          {line_detail("statusMessage")()}
        </div>
      )}
    <div style={{fontSize: 20}}>
      <HBox>
        <div style={{fontSize: 20}} ratio={2}>Balance:</div>
        <div style={{fontSize: 20,textAlign:"right"}} ratio={1}>7650</div>
      </HBox>
    </div>
    <div>
      <HBox>
        <div style={{fontSize: 17}} ratio={2}>Today Expense:</div>
        <div style={{fontSize: 17,textAlign:"right"}} ratio={1}>{total}</div>
      </HBox>
    </div>
  </VBox>
}