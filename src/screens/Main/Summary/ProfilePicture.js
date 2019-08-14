import React from "react";
import { merge } from "lodash";
import usePointer from "../../../pointer/usePointer";

export default function ProfilePicture(props) {
  const line_detail = usePointer("line_detail");
  const user_detail = usePointer("user_detail");

  return (
    <div style={merge({ textAlign: "center", marginRight: 5 }, props.style)}>
      <img
        width="100%"
        src={
          line_detail("pic").isReady
            ? line_detail("pic")()
            : user_detail("pic").isReady
            ? user_detail("pic")()
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
}
