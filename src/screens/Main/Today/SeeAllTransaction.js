import React from "react";
import { merge } from "lodash";

export default function SeeAllTransaction(props) {
  return (
    <div style={merge(props.style, { width: "100%", textAlign: "right" })}>
      See All Transaction
    </div>
  );
}
