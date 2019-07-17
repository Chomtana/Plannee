import React from "react";
import VBox from "../../../component/VBox";
import LCRBox from "../../../component/LCRBox";
import HBox from "../../../component/HBox";
import { merge } from "lodash";

function Title(props) {
  return (
    <LCRBox
      center={
        <div>
          <b style={{ fontSize: 16 }}>Previous Goal</b>
        </div>
      }
      style={{ marginBottom: 10 }}
    />
  );
}

export default function PreviousGoal(props) {
  return (
    <VBox style={merge(props.style, { backgroundColor: "white", padding: 10 })}>
      <Title {...props} />
    </VBox>
  );
}
