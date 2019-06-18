import React from "react";
import NavBar from "../component/NavBar";

export default function MainLayout(props) {
  return (
    <div>
      <NavBar>{props.children}</NavBar>
    </div>
  );
}
