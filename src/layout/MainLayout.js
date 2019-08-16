import React from "react";
import NavBar from "../component/NavBar";
import BottomNav from "./BottomNav";
import loggedin from "../action/loggedin";
import usePointer from "../pointer/usePointer";

export default function MainLayout(props) {
  const isloggedin = loggedin(usePointer("user_detail"));
  
  return (
    <div>
      <NavBar>
        <div style={{marginBottom: 50}}>
          {props.children}
        </div>
      </NavBar>
      {isloggedin && <BottomNav></BottomNav>}
    </div>
  );
}
