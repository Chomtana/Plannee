import React from "react";
import HBox from "../HBox";
import monthi2text from "../../action/monthi2text";

const arrowStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: 24,
  marginLeft: 10,
  marginRight: 10
}

export default function MiniMonthSelector(props) {
  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <div style={arrowStyle}>
        <b style={{fontSize: arrowStyle.fontSize}}>&lt;</b>
      </div>
      <div
        style={{ width: 200, backgroundColor: "white", textAlign: "center", padding: 5, borderRadius: 10 }}
        onClick={()=>props.isEditing.set(true)}
      >
        {monthi2text(props.selectedMonth())}{" "}
        {parseInt(props.selectedYear()) + 543}
      </div>
      <div style={arrowStyle}>
        <b style={{fontSize: arrowStyle.fontSize}}>&gt;</b>
      </div>
    </div>
  );
}
