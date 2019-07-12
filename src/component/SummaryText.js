import React from "react"
import sumByCategory from './../action/sumByCategory';
import VBox from './VBox';
import LCRBox from './LCRBox';

export default function SummaryText(props) {
  var data = sumByCategory(props.records, props.categories);

  return (
    <VBox gap={10}>
      {Object.keys(data).map(category => 
        <LCRBox
          center={<div>{category}</div>}
          right={<div style={{whiteSpace: "nowrap"}}>{data[category]}</div>}
        />
      )}
    </VBox>
  );
}