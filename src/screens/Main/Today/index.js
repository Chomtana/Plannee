import React from "react";

import TodayTitle from "./TodayTitle";
import VBox from "./../../../component/VBox";
import Record from "./../../../component/Record";
import SeeAllTransaction from "./SeeAllTransaction";
import TodayChart from "./TodayChart";

export default function Today(props) {
  return (
    <div style={props.style}>
    <VBox gap={10} style={{backgroundColor:"white", padding: 10}}>
      <TodayTitle {...props} />
      {props.records.map(record => (
        <Record record={record} hasEditMenu key={record.pureid} />
      ))}
      <SeeAllTransaction {...props} />
      <TodayChart {...props} />
    </VBox></div>
  );
}
