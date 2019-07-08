import React from "react";
import HBox from "../../../component/HBox";
import SummaryChart from "../../../component/SummaryChart2";
import VBox from "./../../../component/VBox";
import LCRBox from "../../../component/LCRBox";

function ChartText(props) {
  var data = {};

  for (var category of props.categories) {
    var sum = 0;
    for (var record of props.records) {
      if (record("category")("name")() == category("name")()) {
        sum += record("value")();
      }
    }
    if (sum > 0) {
      data[category("name")()] = sum;
    }
  }

  return (
    <VBox>
      {Object.keys(data).map(category => 
        <LCRBox
          center={<div>{category}</div>}
          right={<div style={{whiteSpace: "nowrap"}}>{data[category]}</div>}
        />
      )}
    </VBox>
  );
}

export default function TodayChart(props) {
  return (
    <HBox>
      <div>
        <SummaryChart {...props} />
      </div>
      <div>
        <ChartText {...props} />
      </div>
    </HBox>
  );
}
