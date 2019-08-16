import React from "react";
import ProfilePicture from "./ProfilePicture";
import SummaryText from "./SummaryText";
import HBox from "./../../../component/HBox";
import VBox from "../../../component/VBox";
import DateSelector from "../../../component/DateSelector/DateSelector";
import useStatePointer from "../../../pointer/useStatePointer";

export default function Summary(props) {
  
  return (
    <VBox style={props.style}>
      <HBox style={{ backgroundColor: "white", padding: 10 }}>
        <ProfilePicture {...props} ratio={1} />
        <SummaryText {...props} ratio={5} />
      </HBox>
    </VBox>
  );
}
