import React, { useState } from "react";
import ProfileContent from "../component/Profile";
import BackButton from "../component/BackButton";
import usePointer from "../pointer/usePointer";

export default function Profile(props) {
  const line_detail = usePointer("line_detail");

  return (
    <div>
      {false && <ProfileContent {...props} />}
      {line_detail("pic").isReady ? (
        <div style={{ textAlign: "center" }}>
          <img src={line_detail("pic")()} width="50%" />
        </div>
      ) : <div style={{fontSize: 18, textAlign: "center"}}>กรุณาใช้ Plannee line official account เพื่อเห็น Profile ของคุณ</div>}
      {line_detail("name").isReady && (
        <div style={{ textAlign: "center", fontSize: 20 }}>
          {line_detail("name")()}
        </div>
      )}
      {line_detail("userId").isReady && (
        <div style={{ textAlign: "center", color: "#aaa" }}>
          {line_detail("userId")()}
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
