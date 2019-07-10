import React, { useState } from "react";
import HBox from "../component/HBox";
import Link from "../router/Link";
import { merge, cloneDeep } from "lodash";
import useStatePointer from "../pointer/useStatePointer";
import Slide from "@material-ui/core/Slide";
import { useSelector } from "react-redux";
import RecordUpdate from "./../component/RecordUpdate";
import usePointer from "../pointer/usePointer";
import { record_template } from "../store";

function Btn(props) {
  return (
    <div style={merge({ textAlign: "center" }, props.style)}>
      <Link to={props.link}>
        <img
          src={
            "/img/bottomnav/" +
            (props.active ? "active" : "notactive") +
            "/" +
            props.img +
            ".png"
          }
          height={props.height || 30}
        />
      </Link>
    </div>
  );
}

function Home(props) {
  return <Btn {...props} img="home" link={["home"]} />;
}

function Goal(props) {
  return <Btn {...props} img="goal" link={["goal"]} />;
}

function Add_Camera(props) {
  //console.log("add run");

  return (
    <div style={merge({ textAlign: "center" }, props.style)} onClick={() => {}}>
      <img src={"/img/bottomnav/camera.png"} height={45} />
    </div>
  );
}

function Add_Microphone(props) {
  //console.log("add run");

  return (
    <div style={merge({ textAlign: "center" }, props.style)} onClick={() => {}}>
      <img src={"/img/bottomnav/microphone.png"} height={50} />
    </div>
  );
}

function Add_Manual(props) {
  //console.log("add run");
  return (
    <div
      style={merge({ textAlign: "center" }, props.style)}
      onClick={() => {
        props.isAdding.set(true);
      }}
    >
      <img src={"/img/bottomnav/manualadd.png"} height={45} />
    </div>
  );
}

function AddBar(props) {
  //console.log("addbar");
  //if (!props.showAddMenu()) return null;

  return (
    <Slide direction="up" in={props.showAddMenu()} mountOnEnter unmountOnExit>
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 60,
          marginLeft: "auto",
          marginRight: "auto",
          width: 200 /* Need a specific value to work */
        }}
      >
        <HBox>
          <Add_Camera {...props} />
          <Add_Microphone {...props} />
          <Add_Manual {...props} />
        </HBox>
      </div>
    </Slide>
  );
}

function Add(props) {
  //console.log("add run");

  return (
    <div
      style={merge({ textAlign: "center" }, props.style)}
      onClick={() => {
        props.showAddMenu.set(!props.showAddMenu());
        //console.log(props.showAddMenu());
      }}
    >
      <img
        src={
          "/img/bottomnav/" +
          (props.active ? "active" : "notactive") +
          "/add.png"
        }
        height={40}
      />
      <AddBar {...props} />
    </div>
  );
}

function Graph(props) {
  return <Btn {...props} img="graph" link={["graph"]} />;
}

function Settings(props) {
  return <Btn {...props} img="settings" link={["settings"]} />;
}

export default function BottomNav(props) {
  const showAddMenu = useStatePointer(false);
  const route = useSelector(state => state._route.path);

  const records = usePointer("records");

  const record = useStatePointer(cloneDeep(record_template));

  const isAdding = useStatePointer(false);

  console.log(route, route.length == 0 || route[0] == "home");

  return (
    <HBox
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        height: 50,
        backgroundColor: "#8D8D8B"
      }}
    >
      <Home {...props} active={route.length == 0 || route[0] == "home"} />
      <Goal {...props} />
      <Add {...props} showAddMenu={showAddMenu} isAdding={isAdding} />
      <Graph {...props} />
      <Settings {...props} />

      {isAdding && (
        <RecordUpdate
          {...props}
          open={isAdding}
          record={record}
          onSubmit={() => {
            records.push(record());
            record.set(cloneDeep(record_template));
          }}
          onCancel={() => {
            record.set(cloneDeep(record_template));
          }}
        />
      )}
    </HBox>
  );
}
