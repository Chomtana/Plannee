import React from "react";
import { merge } from "lodash";
import Link from "../../../router/Link";

export default function SeeAllTransaction(props) {
  return (
    <div style={merge(props.style, { width: "100%", textAlign: "right" })}>
      <Link to={["transaction"]}>See All Transaction</Link>
    </div>
  );
}
