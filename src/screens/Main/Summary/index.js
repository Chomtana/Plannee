import React from "react";
import ProfilePicture from "./ProfilePicture";
import SummaryText from "./SummaryText";
import HBox from "./../../../component/HBox";

export default function Summary(props) {
  return (
    <div style={props.style}>
      <HBox style={{ backgroundColor: "white", padding: 10 }}>
        <ProfilePicture {...props} ratio={1} />
        <SummaryText {...props} ratio={5} />
      </HBox>
    </div>
  );
}
