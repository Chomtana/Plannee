import React from "react"
import sumByCategory from './../action/sumByCategory';
import VBox from './VBox';
import LCRBox from './LCRBox';

export default function SummaryText(props) {
  var data = sumByCategory(props.records, props.categories);

  var total = 0;
  for(var x in data) total += data[x];

  return (
    <VBox gap={10}>
      <div><b>Expense</b></div>
      {Object.keys(data).map(category => 
        <LCRBox
          center={<div>{category}</div>}
          right={<div style={{whiteSpace: "nowrap"}}>{data[category]}</div>}
        />
      )}
      <hr></hr>
      <div style={{textAlign:"right"}}>{total}</div>
    </VBox>
  );
}