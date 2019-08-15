import React, { useState } from "react";
import ProfileContent from "../component/Profile";
import BackButton from "../component/BackButton";
import usePointer from "../pointer/usePointer";

export default function Profile(props) {
  const line_detail = usePointer("line_detail");
  const user_detail = usePointer("user_detail");

  return (
    <div>
      <BackButton></BackButton>
      {false && <ProfileContent {...props} />}
      <div style={{ textAlign: "center" }}>
        <img src={line_detail("pic")() || user_detail("pic")() || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} width="50%" style={{borderRadius: "50%"}} />
      </div>
      <div style={{ textAlign: "center", fontSize: 20 }}>
        {line_detail("name")() || user_detail("name")()}
      </div>
      {user_detail("email").isReady && (
        <div style={{ textAlign: "center", color: "#aaa" }}>
          {user_detail("email")()}
        </div>
      )}
      {line_detail("statusMessage").isReady && (
        <div style={{ textAlign: "center", marginTop: 10}}>
          {line_detail("statusMessage")()}
        </div>
      )}
    </div>
  );
}
