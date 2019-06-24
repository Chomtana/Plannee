import React, { useState } from "react";
import ProfileContent from '../component/Profile'
export default function Profile(props) {
  return (
    <div>
      <ProfileContent {...props}></ProfileContent>
    </div>
  );
}