import React from "react";
import VBox from "../../../component/VBox";
import HBox from './../../../component/HBox';

function Pic(props) {
  return <div style={props.style}>Pic</div>;
}

function Detail(props) {
  return (
    <VBox style={props.style}>
      <div>Fender Telecaster American Standard</div>
      <div>Amount : 50,000</div>
      <div>Starting Date: 10 Jun 2019</div>
      <div>Ending Date: 10 Jun 2020</div>
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
