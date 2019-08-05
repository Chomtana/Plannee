import React from "react";
import { merge } from "lodash";

function diffDate(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function RecordGroupTitle(props) {
  var dateDiff = diffDate(new Date(), props.date);

  return (
    <div style={merge({whiteSpace: "nowrap"},props.style)}>
      <span style={{ fontSize: "14pt" }}>
        {dateDiff == -1 ? "พรุ่งนี้" : ""}
        {dateDiff == 0 ? "วันนี้" : ""}
        {dateDiff == 1 ? "เมื่อวาน" : ""}
        {Math.abs(dateDiff) > 1 ? props.date.toLocaleDateString() : ""}
      </span>{" "}
      {Math.abs(dateDiff) <= 1 ? props.date.toLocaleDateString() : ""}
    </div>
  );
}
