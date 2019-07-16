import React from "react";
import NavBar from "../component/NavBar";
import BottomNav from "./BottomNav";

export default function MainLayout(props) {
  return (
    <div>
      <NavBar>
        <div style={{marginBottom: 50}}>
          {props.children}
        </div>
      </NavBar>
      <BottomNav></BottomNav>
    </div>
  );
}
