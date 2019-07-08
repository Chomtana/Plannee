import React from "react";
import Item from "./Item";
import VBox from './../../../component/VBox';

export default function WeeklyBudget(props) {
  return (<div style={props.style}>
    <VBox gap={10} style={{backgroundColor: "white", padding: 10}}>
      <div>Weekly Budget</div>
      {props.categories.map(category => (
        <Item {...props} category={category} />
      ))}
    </VBox></div>
  );
}
