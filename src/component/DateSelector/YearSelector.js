import React from "react";
import HBox from "../HBox";

const arrowStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: 24,
  marginLeft: 10,
  marginRight: 10
}

export default function YearSelector(props) {
  return <div style={{
    display: "flex",
    justifyContent: "center"
  }}>
    <div style={{display: "flex", flexDirection: "row"}}>
      <div onClick={()=>props.selectedYear.set(props.selectedYear()-1)} style={arrowStyle}><b style={{fontSize: arrowStyle.fontSize}}>&lt;</b></div>
      <div style={{ width: 100, backgroundColor: "white", textAlign: "center", padding: 5, borderRadius: 10 }}>{parseInt(props.selectedYear()) + 543}</div>
      <div onClick={()=>props.selectedYear.set(props.selectedYear()+1)} style={arrowStyle}><b style={{fontSize: arrowStyle.fontSize}}>&gt;</b></div>
    </div>
  </div>
}