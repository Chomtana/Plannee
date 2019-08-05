import React from "react"
import RecordGroupTitle from "../../../component/RecordGroupTitle";

export default function TodayTitle(props) {
  return (
    <RecordGroupTitle date={new Date()} style={props.style}></RecordGroupTitle>
  )
}