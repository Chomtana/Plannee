import React, { useState } from "react";
import ProfileContent from '../component/Profile'
import BackButton from "../component/BackButton";
export default function Profile(props) {
  return (
    <div>
      <ProfileContent {...props}></ProfileContent>
    </div>
  );
}