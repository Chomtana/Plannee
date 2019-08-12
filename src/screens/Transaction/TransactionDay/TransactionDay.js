import React from "react"
import RecordGroupTitle from "../../../component/RecordGroupTitle";
import Record from "../../../component/Record";
import VBox from "../../../component/VBox";

export default function TransactionDay(props) {
  return (<div style={{padding: 10, backgroundColor: "white"}}>
    <RecordGroupTitle date={props.date}></RecordGroupTitle>
    <VBox style={{marginTop: 10}} gap={10}>
      {props.records.map(record => (
        <Record record={record} key={record.pureid} />
      ))}
    </VBox>
  </div>)
}