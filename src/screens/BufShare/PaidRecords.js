import React from "react"
import VBox from "../../component/VBox";
import PaidRecord from "./PaidRecord";



export default function PaidRecords(props) {
  const records = props.data("buf_record");
  
  return <VBox>
    {records.map(record => {
      <PaidRecord {...props} record={record} key={record.pureid}></PaidRecord>
    })}
  </VBox>
}