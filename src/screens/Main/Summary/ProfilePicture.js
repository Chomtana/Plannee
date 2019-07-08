import React from "react";
import { merge } from "lodash";

export default function ProfilePicture(props) {
  return (
    <div style={merge({ textAlign: "center", marginRight: 5 }, props.style)}>
      Pic
    </div>
  );
}
