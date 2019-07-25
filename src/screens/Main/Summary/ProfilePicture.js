import React from "react";
import { merge } from "lodash";
import usePointer from "../../../pointer/usePointer";

export default function ProfilePicture(props) {
  const line_detail = usePointer("line_detail");

  return (
    <div style={merge({ textAlign: "center", marginRight: 5 }, props.style)}>
      {line_detail("pic").isReady ? (
        <img
          width="100%"
          src={line_detail("pic")()}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <img
          width="100%"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          style={{ borderRadius: "50%" }}
        />
      )}
    </div>
  );
}
