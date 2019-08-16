import React from "react";
import VBox from "../../../component/VBox";
import HBox from './../../../component/HBox';

function Pic(props) {
  return <div style={props.style}>
    <img src="./img/retire.jpg" width="100%" style={{borderRadius: "50%"}}></img>
  </div>;
}

function Detail(props) {
  return (
    <VBox style={props.style}>
      <div>Retirement Phase 1</div>
      <div>Amount : 12,000</div>
      <div>Starting Date: 10 Jul 2019</div>
      <div>Ending Date: 10 Jul 2020</div>
    </VBox>
  );
}

export default function GoalDetailDeep(props) {
  return (
    <HBox style={props.style}>
      <Pic {...props} ratio={1} />
      <Detail {...props} ratio={4} />
    </HBox>
  );
}
