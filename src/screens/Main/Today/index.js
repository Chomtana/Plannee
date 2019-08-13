import React from "react";

import TodayTitle from "./TodayTitle";
import VBox from "./../../../component/VBox";
import Record from "./../../../component/Record";
import SeeAllTransaction from "./SeeAllTransaction";
import TodayChart from "./TodayChart";
import todayRecords from "../../../action/todayRecords";

export default function Today(props) {
  const records = todayRecords(props.records);
  //console.log(props.records);
  
  return (
    <div style={props.style}>
    <VBox gap={10} style={{backgroundColor:"white", padding: 10}}>
      <TodayTitle {...props} />
      {records.map(record => (
        <Record record={record} hasEditMenu key={record.pureid} />
      ))}
      {records.length == 0 && <div style={{textAlign: "center"}}>ยังไม่มีรายการรายรับรายจ่าย</div>}
      <SeeAllTransaction {...props} />
      <TodayChart {...props} />
    </VBox></div>
  );
}
