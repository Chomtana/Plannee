import React from "react";
import HBox from "../../../component/HBox";
import SummaryChart from "../../../component/SummaryChart";
import VBox from "./../../../component/VBox";
import LCRBox from "../../../component/LCRBox";
import SummaryText from "../../../component/SummaryText";

export default function TodayChart(props) {
  return (
    <VBox>
      <div>
        <SummaryChart {...props} />
      </div>
      <div>
        <SummaryText {...props} />
      </div>
    </VBox>
  );
}
