import React from "react";

import VBox from "../VBox";
import { merge } from "lodash";

export default function UICard(props) {
  return (
    <VBox style={merge({ backgroundColor: "white", padding: 10 }, props.style)}>
      <h2>{props.title}</h2>
      <hr />
      {props.children}
    </VBox>
  );
}
